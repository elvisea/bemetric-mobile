import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { BleError } from "react-native-ble-plx";

import { FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { HStack, ScrollView, VStack } from "native-base";

import api from "@services/api";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { requestPermissions } from "@manager/permissions";

import { StatusButton } from "@components/StatusButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RowInformation } from "@components/RowInformation";

import { ITypeParams } from "./types";
import { initialState, responses } from "./constants";

export function TelemetryDevice() {
  const route = useRoute();
  const navigation = useNavigation();

  const context = useBluetooth();

  const { colors } = THEME;
  const { params } = route.params as ITypeParams;

  const [state, setState] = useState(initialState);

  const isTheDeviceTheSameAndIsItConnected = useCallback(() => {
    if (context.device && state.data) {
      return context.device.name === state.data.serial;
    }

    if (!context.device && !state.data) {
      return false;
    }

    if (!context.device && state.data) {
      return false;
    }
  }, [context.device, state.data]);

  const handleConnect = async () => {
    if (typeof state.data === "object" && state.data) {
      const name = state.data.serial.trim().toUpperCase();
      const device = context.devices.find((device) => device.name === name);

      if (device) {
        try {
          setState((previousState) => ({
            ...previousState,
            title: "Conectando...",
            isConnecting: true,
          }));

          const result = await context.connectToDevice(device.id);

          if (result) {
            const isConnected = await result.isConnected();

            if (isConnected) {
              context.setDevice(result);

              setState((previousState) => ({
                ...previousState,
                title: "Conectado",
                isConnecting: false,
              }));
            }
          } else {
            setState((previousState) => ({
              ...previousState,
              title: "Desconectado",
              isConnecting: false,
            }));

            Alert.alert(responses[4].title, responses[4].subtitle, [
              { text: "Tentar novamente" },
            ]);
          }
        } catch (error) {
          setState((previousState) => ({
            ...previousState,
            title: "Desconectado",
            isConnecting: false,
          }));

          if (error instanceof BleError) {
            Alert.alert(error.message, error.message);
          }
        }
      } else {
        setState((previousState) => ({
          ...previousState,
          title: "Desconectado",
          isConnecting: false,
        }));

        Alert.alert(responses[0].title, responses[0].subtitle);
      }
    } else {
      setState((previousState) => ({
        ...previousState,
        title: "Desconectado",
        isConnecting: false,
      }));

      Alert.alert(responses[1].title, responses[1].subtitle);
    }
  };

  const obterSinaisDoDispositivo = async () => {
    if (state.data) {
      const GET_VBAT = { BT_PASSWORD: state.data.chave.trim(), GET_VBAT: "" };
      await context.sendCommand(GET_VBAT, 2000);

      const GET_WIFI_STATUS = {
        BT_PASSWORD: state.data.chave.trim(),
        GET_WIFI_STATUS: "",
      };
      await context.sendCommand(GET_WIFI_STATUS, 4000);

      const GET_MODEM_SIGNAL = {
        BT_PASSWORD: state.data.chave.trim(),
        GET_MODEM_SIGNAL: "",
      };
      await context.sendCommand(GET_MODEM_SIGNAL, 6000);
    }
  };

  const configureDataConnection = async () => {
    if (isTheDeviceTheSameAndIsItConnected()) {
      if (typeof state.data === "object" && state.data) {
        setState((previousState) => ({ ...previousState, values: [] }));

        context.clearReceivedValues();

        navigation.navigate("IncludeStackRoutes", {
          screen: "ConfigurarConexaoDados",
          params: {
            chave: state.data.chave.trim(),
          },
        });
      }
    } else {
      Alert.alert(responses[2].title, responses[2].subtitle);
    }
  };

  const handleTestDevice = async () => {
    if (isTheDeviceTheSameAndIsItConnected()) {
      if (typeof state.data === "object" && state.data) {
        console.log("Você pode testar o Dispositivo.");

        if (state.data) {
          const CMD_TEST_ALL = {
            BT_PASSWORD: state.data.chave.trim(),
            CMD_TEST_ALL: "",
          };
          await context.sendCommand(CMD_TEST_ALL, 4);
        }
      }
    } else {
      Alert.alert(responses[2].title, responses[2].subtitle);
    }
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    context.setPermissions(isGranted);
  };

  const setSignals = () => {
    setState((previousState) => ({
      ...previousState,
      signals: { ...previousState.signals, ...context.response },
    }));

    context.clearReceivedValues();
  };

  const verificarResposta = () => {
    switch (context.response.GET_MODEM_SIGNAL) {
      case "OK":
        setSignals();
        break;

      case "NOK":
        setSignals();
        break;

      case "BUSY":
        setSignals();
        break;
    }

    switch (context.response.WIFI_STATUS_CONNECTION) {
      case "0":
        setSignals();
        break;

      case "1":
        setSignals();
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (Object.values(context.response).length > 0) {
        verificarResposta();
      }
    }, [context.response]),
  );

  useFocusEffect(
    useCallback(() => {
      if (isTheDeviceTheSameAndIsItConnected()) {
        setState((previousState) => ({
          ...previousState,
          title: "Conectado",
        }));

        obterSinaisDoDispositivo();
      }
    }, [isTheDeviceTheSameAndIsItConnected]),
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setState((previousState) => ({ ...previousState, isLoading: true }));

          const [resposta1, resposta2] = await Promise.all([
            api.post("/Dashboard/ObterListaDadosEquipamento", {
              codigoEquipamento: params.codigoEquipamento,
            }),

            api.post("/Equipamento/DetalhamentoDispositivoTelemetria", {
              codigoEquipamento: params.codigoEquipamento,
            }),
          ]);

          console.log("RESPOSTA 1", resposta1.data);
          console.log("RESPOSTA 2", resposta2.data);

          const response = await api.post(
            "/Equipamento/DetalhamentoDispositivoTelemetria",
            {
              codigoEquipamento: params.codigoEquipamento,
            },
          );

          if (isActive) {
            setState((previousState) => ({
              ...previousState,
              data: response.data,
            }));
          }
        } catch (error) {
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
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
              title={state.title}
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
