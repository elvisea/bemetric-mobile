import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { BleError } from "react-native-ble-plx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useBluetooth } from "@hooks/bluetooth";
import BluetoothManager from "@manager/bluetooth";
import { requestPermissions } from "@manager/permissions";

import { processReceivedValues } from "@utils/processReceivedValues";

import { TypeForm, TypeParams } from "./types";
import { initialState, inputs, responses, schema } from "./constants";

const bluetoothManager = BluetoothManager.getInstance();

export function VincularDispositivo() {
  const navigation = useNavigation();
  const context = useBluetooth();

  const route = useRoute();
  const params = route.params as TypeParams;

  const [state, setState] = useState(initialState);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: {
      chave: params?.chave ? params.chave : undefined,
      serial: params?.serial ? params.serial : undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const sendCommand = async (chave: string) => {
    const COMMAND = { BT_PASSWORD: chave.trim(), GET_SERIAL_KEY: "" };
    await context.writeCharacteristic(COMMAND);
  };

  const handleAdvance = async ({ chave, serial }: TypeForm) => {
    try {
      clearReturnedValues();

      setState((oldState) => ({ ...oldState, isLoading: true }));

      const device = state.devices.find(
        (device) => device.name === serial.trim().toUpperCase(),
      );

      if (device) {
        await context.connectToDevice(device.id);

        const isConnected = await context.isDeviceConnected(
          device.id,
        );

        if (isConnected) {
          setState((oldState) => ({ ...oldState, isConnected: isConnected }));
          await sendCommand(chave);
        }
      } else {
        setState((oldState) => ({ ...oldState, isLoading: false }));
        Alert.alert(responses[4].title, responses[4].subtitle);
      }
    } catch (error) {
      if (error instanceof BleError) {
        Alert.alert(error.message, error.message);
      }
    }
  };

  const continueRegistration = () => {
    clearReturnedValues();
    const chave = getValues("chave");

    navigation.navigate("ConfigurarConexaoDados", {
      chave,
    });
  };

  const checkDeviceAvailability = async () => {
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const chave = getValues("chave");
      const serial = getValues("serial");

      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave,
        serial: serial.trim().toUpperCase(),
      });

      if (data === 0) {
        clearReturnedValues();

        Alert.alert(responses[5].title, responses[5].subtitle, [
          {
            text: "Continuar",
            onPress: () => continueRegistration(),
          },
        ]);
      }

      if (data !== 0) {
        clearReturnedValues();

        Alert.alert(responses[data].title, responses[data].subtitle, [
          {
            text: "Tente outro dispositivo",
            onPress: () => clearReturnedValues(),
          },
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setState((oldState) => ({ ...oldState, isLoading: false }));
    }
  };

  const clearReturnedValues = () => {
    context.removeValues();
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    setState((oldState) => ({ ...oldState, permissionsGranted: isGranted }));
  };

  const checkObjectProperties = (retorno: object) => {
    if ("BT_PASSWORD" in retorno) {
      setState((oldState) => ({ ...oldState, isLoading: false }));

      Alert.alert(responses[6].title, responses[6].subtitle, [
        {
          text: "Tentar Novamente",
          onPress: () => clearReturnedValues(),
        },
      ]);
    }

    if ("GET_SERIAL_KEY" in retorno) {
      checkDeviceAvailability();
    }
  };

  const onValueChange = () => {
    const response = processReceivedValues(context.values);
    checkObjectProperties(response);
  };

  useFocusEffect(
    useCallback(() => {
      if (context.values.length > 0) {
        onValueChange();
      }
    }, [context.values]),
  );

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();

      const allowed =
        state.permissionsGranted && context.bluetoothEnabled;

      if (allowed) {
        bluetoothManager.scanForDevices((scannedDevices) => {
          setState((oldState) => ({ ...oldState, devices: scannedDevices }));
        });
      }

      return () => {
        bluetoothManager.stopScan();
      };
    }, [state.permissionsGranted, context.bluetoothEnabled]),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        context.removeValues();
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Vincular ao dispositivo" />

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
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

      {!state.isLoading && (
        <ButtonFull
          title="Avançar"
          isLoading={state.isLoading}
          onPress={handleSubmit(handleAdvance)}
        />
      )}
    </LayoutDefault>
  );
}
