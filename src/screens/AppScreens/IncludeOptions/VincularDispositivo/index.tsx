import { useCallback, useEffect, useState } from "react";
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

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import {
  CHARACTERISTIC_UUID,
  SERVICE_UUID,
  MONITORED_FEATURE_UUID,
} from "@hooks/uuid";

import { IFormProps, IParams } from "./interfaces";
import { response } from "./constants/response";

export function VincularDispositivo() {
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);

  const {
    devices,
    deviceResponse,
    bluetoothEnabled,
    permissionsGranted,
    scanForDevices,
    resetBluetooth,
    connectToDevice,
    setCommand,
    setServiceUUID,
    setCharacteristicUUID,
    requestPermissions,
    changeGrantedPermissions,
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

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const chooseAnotherDevice = async () => resetBluetooth();

  async function checkAvailability() {
    try {
      const chave = getValues("chave");
      const serial = getValues("serial");

      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave,
        serial: serial.trim().toUpperCase(),
      });

      if (data === 0) {
        Alert.alert(
          "Dispositivo liberado.",
          "Dispositivo liberado para ser associado. Continue seu cadastro.",
          [
            {
              text: "Continuar",
              onPress: () => navigation.navigate("ConfigureConnection"),
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

  async function handleAdvance({ chave, serial }: IFormProps) {
    setIsLoading(false);

    const name = serial.trim().toUpperCase();
    const found = devices.find((device) => device.name === name);

    if (found) {
      const COMMAND = { BT_PASSWORD: chave.trim(), GET_SERIAL_KEY: "" };

      setServiceUUID(SERVICE_UUID);
      setCharacteristicUUID(MONITORED_FEATURE_UUID);

      setTimeout(() => {
        connectToDevice(found.id);
      }, 1000);

      setCommand(COMMAND);

      setTimeout(() => {
        setCharacteristicUUID(CHARACTERISTIC_UUID);
      }, 3000);
    } else {
      setIsLoading(false);

      Alert.alert(
        "Dispositivo não encontrado.",
        "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente."
      );
    }
  }

  useEffect(() => {
    const handleDeviceValueChange = () => {
      if (deviceResponse) {
        if ("BTPASSWORD" in deviceResponse) {
          Alert.alert(
            "Credenciais inválidas.",
            "Verifique se as credenciais de acesso estão corretas."
          );
        } else {
          checkAvailability();
        }
      }
    };

    handleDeviceValueChange();
  }, [deviceResponse]);

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    changeGrantedPermissions(isGranted);
  };

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

      <ButtonFull
        title="Avançar"
        isLoading={isLoading}
        onPress={handleSubmit(handleAdvance)}
      />
    </LayoutDefault>
  );
}
