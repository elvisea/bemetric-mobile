import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { BleError, State } from "react-native-ble-plx";

import { FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { HStack, ScrollView, VStack } from "native-base";

import api from "@services/api";
import BluetoothManager from "@manager/bluetooth";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { removeDuplicateDevices } from "@utils/bluetooth";
import { requestPermissions } from "@manager/permissions";

import { StatusButton } from "@components/StatusButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RowInformation } from "@components/RowInformation";

import { ITypeParams } from "./types";
import { initialState, response } from "./constants";

const bluetoothManager = BluetoothManager.getInstance();

export function TelemetryDevice() {
  const route = useRoute();
  const navigation = useNavigation();

  const context = useBluetooth();

  const { colors } = THEME;
  const { params } = route.params as ITypeParams;

  const [state, setState] = useState(initialState);

  const deviceIsSame = () => {
    if (context.device && state.data) {
      return context.device.name === state.data.serial;
    }

    if (!context.device && !state.data) {
      return false;
    }

    if (!context.device && state.data) {
      return false;
    }
  };

  const sendCommandToConnect = async (chave: string) => {
    const COMMAND = { BT_PASSWORD: chave.trim(), GET_SERIAL_KEY: "" };
    await bluetoothManager.writeCharacteristic(COMMAND);
  };

  const handleConnect = async () => {
    if (typeof state.data === "object" && state.data) {
      const name = state.data.serial.trim().toUpperCase();
      const device = state.devices.find((device) => device.name === name);

      if (device) {
        try {
          setState((previousState) => ({ ...previousState, isConnecting: true }));

          const result = await bluetoothManager.connectToDevice(device.id);

          if (result) {
            const isConnected = await result.isConnected();

            if (isConnected) {
              context.setDevice(result);
              sendCommandToConnect(state.data.chave); // Talvez não precise desta etapa
            }
          }
        } catch (error) {
          setState((previousState) => ({ ...previousState, isConnecting: false }));

          if (error instanceof BleError) {
            Alert.alert(error.message, error.message);
          }
        }
      } else {
        setState((previousState) => ({ ...previousState, isConnecting: false }));

        Alert.alert(response[0].title, response[0].subtitle);
      }
    } else {
      Alert.alert(response[1].title, response[1].subtitle);
    }
  };

  const getWiFiStatus = async (chave: string) => {
    const COMMAND = { BT_PASSWORD: chave.trim(), GET_WIFI_STATUS: "" };
    await bluetoothManager.writeCharacteristic(COMMAND);
  };

  const getModemSignal = async (chave: string) => {
    const COMMAND = { BT_PASSWORD: chave.trim(), GET_MODEM_SIGNAL: "" };
    await bluetoothManager.writeCharacteristic(COMMAND);
  };

  const getBatteryLevel = async (chave: string) => {
    const COMMAND = { BT_PASSWORD: chave.trim(), GET_VBAT: "" };
    await bluetoothManager.writeCharacteristic(COMMAND);
  };

  const takeTest = async (chave: string) => {
    const COMMAND = {
      BT_PASSWORD: chave.trim(),
      CMD_TEST_ALL: "",
    };
    await bluetoothManager.writeCharacteristic(COMMAND);
  };

  const getSignalsFromDevice = async () => {
    if (state.data) {
      getWiFiStatus(state.data.chave);
      getModemSignal(state.data.chave);
      getBatteryLevel(state.data.chave);
      // takeTest(state.data.chave);
    }
  };

  const configureDataConnection = async () => {
    if (deviceIsSame()) {
      if (typeof state.data === "object" && state.data) {
        setState((previousState) => ({ ...previousState, values: [] }));

        navigation.navigate("IncludeStackRoutes", {
          screen: "ConfigurarConexaoDados",
          params: {
            chave: state.data.chave.trim(),
          },
        });
      }
    } else {
      Alert.alert(response[2].title, response[2].subtitle);
    }
  };

  const handleTestDevice = async () => {
    if (deviceIsSame()) {
      if (typeof state.data === "object" && state.data) {
        console.log("Você pode testar o Dispositivo.");
      }
    } else {
      Alert.alert(response[2].title, response[2].subtitle);
    }
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    setState((previousState) => ({
      ...previousState, permissionsGranted: isGranted,
    }));
  };

  const monitorBluetoothState = (state: State) => {
    const isPoweredOn = state === State.PoweredOn;
    setState((oldState) => ({ ...oldState, bluetoothEnabled: isPoweredOn }));
  };

  const resetState = () => setState(initialState);

  const addValueReceived = (value: string) => {
    setState((previousState) => ({
      ...previousState,
      values: [...previousState.values, value],
    }));
  };

  useFocusEffect(
    useCallback(() => {
      const startMonitoring = async () => {
        if (deviceIsSame()) {
          const subscription =
            await bluetoothManager.monitorCharacteristic(addValueReceived);

          return () => {
            subscription?.remove();
            resetState();
          };
        }
      };

      startMonitoring();
    }, [deviceIsSame()]),
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setState((previousState) => ({ ...previousState, isLoading: true }));

          const response = await api.post(
            "/Equipamento/DetalhamentoDispositivoTelemetria",
            {
              codigoEquipamento: params.codigoEquipamento,
            },
          );

          if (isActive) {
            setState((previousState) => ({
              ...previousState, data: response.data,
            }));
          }
        } catch (error) {
          if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
        } finally {
          setState((previousState) => ({ ...previousState, isLoading: false }));
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();

      const canScan = state.permissionsGranted && state.bluetoothEnabled;

      if (canScan) {
        bluetoothManager.scanForDevices((scannedDevices) => {
          const devices = removeDuplicateDevices([
            ...state.devices,
            ...scannedDevices,
          ]);
          setState((previousState) => ({ ...previousState, devices: devices }));
        });
      }

      return () => {
        bluetoothManager.stopScan();
      };
    }, [state.permissionsGranted, state.bluetoothEnabled]),
  );

  useFocusEffect(
    useCallback(() => {
      const stateChangeListener = bluetoothManager.monitorBluetoothState(
        (state) => {
          monitorBluetoothState(state);
        },
      );

      return () => {
        stateChangeListener.remove();
      };
    }, []),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Dispositivo de Telemetria" />

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
        <ScrollView
          bg={colors.shape}
          flex={1}
          width="full"
          showsVerticalScrollIndicator={false}
        >
          <RowInformation
            mt={16}
            primaryTitle="N° de Série"
            primaryDescription={state.data ? state.data.serial : "-"}
            secondaryTitle="ID"
            secondaryDescription={
              state.data ? state.data.codigoEquipamento.toString() : "-"
            }
          />

          <RowInformation
            mt={16}
            primaryTitle="Chave de Segurança"
            primaryDescription={state.data ? state.data.chave : "-"}
            secondaryTitle="Versão de Firmware"
            secondaryDescription={state.data ? state.data.firmware : "-"}
          />

          <RowInformation
            mt={16}
            primaryTitle="Ativa Desde"
            primaryDescription={state.data ? state.data.dataAtivacao : "-"}
            secondaryTitle="Última Atualização"
            secondaryDescription={
              state.data ? state.data.dataUltimaAtualizacao : "-"
            }
          />

          <HStack
            w="full"
            mt={`${RFValue(24)}px`}
            px={`${RFValue(16)}px`}
            alignItems="center"
            justifyContent="space-between"
          >
            <StatusButton
              onPress={handleConnect}
              title={
                state.isConnecting
                  ? "Conectando..."
                  : deviceIsSame()
                    ? "Conectado"
                    : "Desconectado"
              }
              width="49"
              icon={
                <FontAwesome5
                  name="bluetooth-b"
                  size={24}
                  color={THEME.colors.blue[700]}
                />
              }
            />

            <StatusButton
              onPress={handleTestDevice}
              title="Testar"
              width="49"
              icon={
                <FontAwesome5
                  name="cogs"
                  size={24}
                  color={THEME.colors.blue[700]}
                />
              }
            />
          </HStack>

          <HStack
            w="full"
            mt={`${RFValue(8)}px`}
            px={`${RFValue(16)}px`}
            alignItems="center"
            justifyContent="space-between"
          >
            <StatusButton
              onPress={configureDataConnection}
              title="Sinal WiFi"
              value="100%"
              width="49"
              icon={
                <FontAwesome5
                  name="wifi"
                  size={24}
                  color={THEME.colors.green[500]}
                />
              }
            />

            <StatusButton
              onPress={configureDataConnection}
              title="Sinal Dados Móveis"
              value="100%"
              width="49"
              icon={
                <FontAwesome5
                  name="signal"
                  size={24}
                  color={THEME.colors.green[500]}
                />
              }
            />
          </HStack>

          <HStack
            w="full"
            mt={`${RFValue(8)}px`}
            mb={`${RFValue(16)}px`}
            px={`${RFValue(16)}px`}
            alignItems="center"
            justifyContent="space-between"
          >
            <StatusButton
              title="Status"
              value="Ativo"
              width="49"
              disabled
              icon={
                <FontAwesome5
                  name="dot-circle"
                  size={24}
                  color={THEME.colors.green[500]}
                />
              }
            />

            <StatusButton
              title="Nível Bateria"
              value="100%"
              width="49"
              disabled
              icon={
                <FontAwesome5
                  name="battery-full"
                  size={24}
                  color={THEME.colors.green[500]}
                />
              }
            />
          </HStack>
        </ScrollView>
      )}
    </VStack>
  );
}
