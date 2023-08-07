import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { ScrollView, Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";
import { ITelemetry } from "@interfaces/ITelemetry";

import { StatusButton } from "@components/StatusButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { IParams } from "../interfaces/IEquipamentDetails";

export function TelemetryDevice() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    scanForDevices,
    isDeviceConnected,
    requestPermissions,
    disconnectDevice,
    changeGrantedPermissions,
    connectToDevice,
    resetReturnValues,
    writeCharacteristicWithResponseForService,

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
      setIsConnecting(true);

      const name = telemetry.serial.trim().toUpperCase();
      const deviceFound = devices.find((device) => device.name === name);

      const COMMAND = {
        BT_PASSWORD: telemetry.chave.trim(),
        GET_SERIAL_KEY: "",
      };

      if (deviceFound) {
        setIsConnecting(true);

        const isConnected = await isDeviceConnected(deviceFound.id);

        if (isConnected) {
          await disconnectDevice(deviceFound.id);

          await connectToDevice(deviceFound.id);
          await writeCharacteristicWithResponseForService(deviceFound, COMMAND);

          resetReturnValues();
          setIsConnecting(false);
        } else {
          await connectToDevice(deviceFound.id);
          await writeCharacteristicWithResponseForService(deviceFound, COMMAND);

          resetReturnValues();
          setIsConnecting(false);
        }
      } else {
        setIsConnecting(false);

        Alert.alert(
          "Dispositivo não encontrado.",
          "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente."
        );
      }
    } else {
      Alert.alert(
        "Informações para conexão não estão disponíveis",
        "Informações para conexão não estão disponíveis."
      );
    }
  };

  const configureDataConnection = async () => {
    if (deviceIsConnected) {
      if (typeof telemetry === "object" && telemetry) {
        resetReturnValues();

        navigation.navigate("IncludeStackRoutes", {
          screen: "ConfigurarConexaoDados",
          params: {
            chave: telemetry.chave.trim(),
          },
        });
      }
    } else {
      Alert.alert(
        "Dispositivo Desconectado.",
        "Você precisa estar conectado para Configurar Conexão de Dados."
      );
    }
  };

  const handleTestDevice = async () => {
    if (deviceIsConnected) {
      if (typeof telemetry === "object" && telemetry) {
        console.log("Você pode testar o Dispositivo.");
      }
    } else {
      Alert.alert(
        "Dispositivo Desconectado.",
        "Você precisa estar conectado para testar Dispositivo."
      );
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
            }
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
    }, [])
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
          <Text
            color="blue.700"
            fontSize={`${RFValue(16)}px`}
            fontFamily="Roboto_500Medium"
            mt={`${RFValue(16)}px`}
            mb={`${RFValue(8)}px`}
            ml={`${RFValue(16)}px`}
            isTruncated
          >
            Informações
          </Text>

          <StatusButton
            title="Nº de Série"
            value={telemetry ? telemetry.serial : ""}
            mb={8}
            disabled
          />
          <StatusButton
            title="Identificação"
            value={telemetry ? telemetry.codigoEquipamento.toString() : ""}
            mb={8}
            disabled
          />
          <StatusButton
            title="Chave de segurança"
            value={telemetry ? telemetry.chave : ""}
            mb={8}
            disabled
          />
          <StatusButton
            title="Versão de Firmware"
            value={telemetry ? telemetry.firmware : ""}
            disabled
          />

          <Text
            color="blue.700"
            fontSize={`${RFValue(16)}px`}
            fontFamily="Roboto_500Medium"
            mt={`${RFValue(16)}px`}
            mb={`${RFValue(8)}px`}
            ml={`${RFValue(16)}px`}
            isTruncated
          >
            Registros
          </Text>

          <StatusButton
            title="Última atualização"
            value={telemetry ? telemetry.dataUltimaAtualizacao : ""}
            mb={8}
            disabled
          />

          <StatusButton
            title="Ativa desde"
            value={telemetry ? telemetry.dataAtivacao : ""}
            disabled
          />

          <Text
            color="blue.700"
            fontSize={`${RFValue(16)}px`}
            fontFamily="Roboto_500Medium"
            mt={`${RFValue(16)}px`}
            mb={`${RFValue(8)}px`}
            ml={`${RFValue(16)}px`}
            isTruncated
          >
            Status
          </Text>

          <StatusButton
            onPress={handleConnect}
            title="Conectado"
            value={
              isConnecting
                ? "Conectando..."
                : deviceIsConnected
                ? "Ligado"
                : "Desligado"
            }
            mb={8}
          />

          <StatusButton title="Status" value="100%" mb={8} disabled />

          <StatusButton title="Nível de Bateria" value="100%" mb={8} disabled />

          <StatusButton
            title="Sinal Wi-Fi"
            value="100%"
            mb={8}
            onPress={configureDataConnection}
          />

          <StatusButton
            title="Sinal Dados Móveis"
            value="100%"
            onPress={configureDataConnection}
          />

          <Text
            color="blue.700"
            fontSize={`${RFValue(16)}px`}
            fontFamily="Roboto_500Medium"
            mt={`${RFValue(16)}px`}
            mb={`${RFValue(8)}px`}
            ml={`${RFValue(16)}px`}
            isTruncated
          >
            Dispositivo
          </Text>

          <StatusButton
            title="Testar Dispositivo"
            mb={16}
            onPress={handleTestDevice}
          />
        </ScrollView>
      )}
    </VStack>
  );
}
