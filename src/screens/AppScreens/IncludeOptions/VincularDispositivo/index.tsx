import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { schema } from "./constants/schema";
import { inputs } from "./constants/inputs";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useBluetooth } from "@hooks/bluetooth";
import { processReturnValues } from "@utils/processReturnValues";

import { response } from "./constants/response";
import { IFormProps, IParams, IResponseObject } from "./interfaces";

export function VincularDispositivo() {
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as IParams;

  const {
    devices,
    returnedValues,
    bluetoothEnabled,
    permissionsGranted,
    scanForDevices,
    resetBluetooth,
    resetTotal,
    connectToDevice,
    resetReturnValues,
    writeCharacteristicWithResponseForService,
    requestPermissions,
    changeGrantedPermissions,
    checkConnectedDevices,
    isDeviceConnected,
    disconnectDevice,
  } = useBluetooth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: {
      chave: params?.chave ? params.chave : undefined,
      serial: params?.serial ? params.serial : undefined,
    },
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseObject, setResponseObject] = useState<IResponseObject>(null);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const chooseAnotherDevice = async () => resetBluetooth();

  async function handleAdvance({ chave, serial }: IFormProps) {
    setIsLoading(true);

    const name = serial.trim().toUpperCase();
    const deviceFound = devices.find((device) => device.name === name);

    const COMMAND = { BT_PASSWORD: chave.trim(), GET_SERIAL_KEY: "" };

    if (deviceFound) {
      setIsLoading(true);

      const isConnected = await isDeviceConnected(deviceFound.id);

      if (isConnected) {
        await disconnectDevice(deviceFound.id);

        await connectToDevice(deviceFound.id);
        await writeCharacteristicWithResponseForService(deviceFound, COMMAND);

        setIsLoading(false);
      } else {
        await connectToDevice(deviceFound.id);
        await writeCharacteristicWithResponseForService(deviceFound, COMMAND);

        setIsLoading(false);
      }
    } else {
      setIsLoading(false);

      Alert.alert(
        "Dispositivo não encontrado.",
        "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente."
      );
    }
  }

  const continueRegistration = () => {
    const chave = getValues("chave");

    navigation.navigate("ConfigurarConexaoDados", {
      chave,
    });

    resetReturnValues();
    setResponseObject(null);
  };

  async function checkAvailability() {
    try {
      const chave = getValues("chave");
      const serial = getValues("serial");

      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave,
        serial: serial.trim().toUpperCase(),
      });

      if (data === 0) {
        resetReturnValues();

        Alert.alert(
          "Dispositivo liberado.",
          "Dispositivo liberado para ser associado. Continue seu cadastro.",
          [
            {
              text: "Continuar",
              onPress: () => continueRegistration(),
            },
          ]
        );
      }

      if (data !== 0) {
        Alert.alert(response[data].title, response[data].subtitle, [
          {
            text: "Tente outro dispositivo",
            onPress: () => chooseAnotherDevice(),
          },
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  const checkIsConnected = async () => {
    const someConnected = await checkConnectedDevices();
    if (someConnected) await resetTotal();
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    changeGrantedPermissions(isGranted);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      checkIsConnected();
      setIsLoading(false);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const processedValue = processReturnValues(returnedValues);

      if (processedValue) {
        setResponseObject(processedValue);
      }
    }, [returnedValues])
  );

  useFocusEffect(
    useCallback(() => {
      if (responseObject) {
        const hasProperty = "BT_PASSWORD" in responseObject;

        if (hasProperty) {
          resetBluetooth();
          resetReturnValues();
          setResponseObject(null);

          Alert.alert(
            "Credenciais inválidas.",
            "Verifique se as credenciais de acesso estão corretas."
          );
        }
      }

      if (responseObject) {
        const hasProperty = "GET_SERIAL_KEY" in responseObject;

        if (hasProperty) checkAvailability();
      }
    }, [responseObject])
  );

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();

      if (permissionsGranted && bluetoothEnabled) {
        scanForDevices();
      }
    }, [permissionsGranted, bluetoothEnabled])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Vincular ao dispositivo" />

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && (
        <VStack flex={1} w="full" paddingX="16px">
          <FlatList
            data={inputs}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: input }) => (
              <>
                <Text
                  mt={`${RFValue(16)}px`}
                  color="blue.700"
                  fontSize={`${RFValue(13)}px`}
                  fontFamily="Roboto_400Regular"
                  marginBottom={`${RFValue(8)}px`}
                >
                  {input.title}
                </Text>

                <Controller
                  control={control}
                  name={input.name}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      py={0}
                      borderBottomColor="blue.700"
                      _input={{
                        color: "#333333",
                        fontSize: "16px",
                        fontFamily: "Roboto_400Regular",
                      }}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={input.keyboardType}
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              </>
            )}
          />
        </VStack>
      )}

      {!isLoading && (
        <ButtonFull
          title="Avançar"
          isLoading={isLoading}
          onPress={handleSubmit(handleAdvance)}
        />
      )}
    </LayoutDefault>
  );
}
