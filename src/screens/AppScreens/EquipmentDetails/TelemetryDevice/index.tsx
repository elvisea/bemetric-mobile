import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { BleError } from "react-native-ble-plx";

import { FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { HStack, ScrollView, VStack } from "native-base";

import api from "@services/api";
import BluetoothManager from "@manager/bluetooth";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { ITelemetry } from "@interfaces/ITelemetry";

import { StatusButton } from "@components/StatusButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RowInformation } from "@components/RowInformation";

import { response } from "./constants";
import { IParams } from "../interfaces/IEquipamentDetails";

const bluetoothManager = BluetoothManager.getInstance();

export function TelemetryDevice() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    isDeviceConnected,
    requestPermissions,
    changeGrantedPermissions,
    connectToDevice,
    removeValues,
    writeCharacteristic,
    setDevices,
    devices,
    bluetoothEnabled,
    deviceIsConnected,
    permissionsGranted,
  } = useBluetooth();

  const { colors } = THEME;
  const { params } = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [telemetry, setTelemetry] = useState<ITelemetry | null>(null);

  const handleConnect = async () => {
    if (typeof telemetry === "object" && telemetry) {
      const name = telemetry.serial.trim().toUpperCase();
      const deviceFound = devices.find((device) => device.name === name);

      if (deviceFound) {
        try {
          setIsConnecting(true);

          const COMMAND = {
            BT_PASSWORD: telemetry.chave.trim(),
            GET_SERIAL_KEY: "",
          };

          const isConnected = await isDeviceConnected(deviceFound.id);

          if (isConnected) {
            await writeCharacteristic(COMMAND);
          } else {
            await connectToDevice(deviceFound.id);
            await writeCharacteristic(COMMAND);
          }
        } catch (error) {
          setIsLoading(false);

          if (error instanceof BleError) {
            Alert.alert(error.message, error.message);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsConnecting(false);

        Alert.alert(response[0].title, response[0].subtitle);
      }
    } else {
      Alert.alert(response[1].title, response[1].subtitle);
    }
  };

  const configureDataConnection = async () => {
    if (deviceIsConnected) {
      if (typeof telemetry === "object" && telemetry) {
        removeValues();

        navigation.navigate("IncludeStackRoutes", {
          screen: "ConfigurarConexaoDados",
          params: {
            chave: telemetry.chave.trim(),
          },
        });
      }
    } else {
      Alert.alert(response[2].title, response[2].subtitle);
    }
  };

  const handleTestDevice = async () => {
    if (deviceIsConnected) {
      if (typeof telemetry === "object" && telemetry) {
        console.log("Você pode testar o Dispositivo.");
      }
    } else {
      Alert.alert(response[2].title, response[2].subtitle);
    }
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    changeGrantedPermissions(isGranted);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setIsLoading(true);

          const response = await api.post(
            "/Equipamento/DetalhamentoDispositivoTelemetria",
            {
              codigoEquipamento: params.codigoEquipamento,
            },
          );

          isActive && setTelemetry(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
        } finally {
          setIsLoading(false);
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

      if (permissionsGranted && bluetoothEnabled) {
        bluetoothManager.scanForDevices((scannedDevices) => {
          setDevices(scannedDevices);
        });
      }

      return () => {
        bluetoothManager.stopScan();
      };
    }, [permissionsGranted, bluetoothEnabled]),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Dispositivo de Telemetria" />

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && (
        <ScrollView
          bg={colors.shape}
          flex={1}
          width="full"
          showsVerticalScrollIndicator={false}
        >
          <RowInformation
            mt={16}
            primaryTitle="N° de Série"
            primaryDescription={telemetry ? telemetry.serial : "-"}
            secondaryTitle="ID"
            secondaryDescription={
              telemetry ? telemetry.codigoEquipamento.toString() : "-"
            }
          />

          <RowInformation
            mt={16}
            primaryTitle="Chave de Segurança"
            primaryDescription={telemetry ? telemetry.chave : "-"}
            secondaryTitle="Versão de Firmware"
            secondaryDescription={telemetry ? telemetry.firmware : "-"}
          />

          <RowInformation
            mt={16}
            primaryTitle="Ativa Desde"
            primaryDescription={telemetry ? telemetry.dataAtivacao : "-"}
            secondaryTitle="Última Atualização"
            secondaryDescription={
              telemetry ? telemetry.dataUltimaAtualizacao : "-"
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
                isConnecting
                  ? "Conectando..."
                  : deviceIsConnected
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
