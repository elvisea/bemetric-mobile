import React, { ReactNode, useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Box, Center, HStack, ScrollView, Text, VStack } from "native-base";

import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

import axios from "axios";
import api from "@services/api";
import { THEME } from "@theme/theme";

import { Item } from "@components/Item";
import { HeaderDefault } from "@components/HeaderDefault";
import { Signals } from "@components/EquipmentDetails/Signals";

import { DetailsTitle } from "@components/EquipmentDetails/Typography/DetailsTitle";
import { DetailsDescription } from "@components/EquipmentDetails/Typography/DetailsDescription";

import { ITelemetry } from "@interfaces/ITelemetry";
import { IParams } from "../interfaces/IEquipamentDetails";

interface IStatus {
  [index: number]: {
    title: string;
    icon: ReactNode;
  };
}

export function TelemetryDevice() {
  const route = useRoute();
  const { colors } = THEME;
  const { params } = route.params as IParams;

  console.log("TelemetryDevice Screen Params:", params);

  const status: IStatus = {
    0: {
      title: "Desativado",
      icon: (
        <MaterialIcons
          name="radio-button-on"
          size={22}
          color={colors.red[700]}
        />
      ),
    },
    1: {
      title: "Offline Coleta Manual",
      icon: (
        <MaterialIcons
          name="radio-button-on"
          size={22}
          color={colors.gray[700]}
        />
      ),
    },
    2: {
      title: "Offline sem Dados",
      icon: <MaterialIcons name="cancel" size={22} color={colors.gray[200]} />,
    },
    3: {
      title: "Crítico",
      icon: (
        <MaterialCommunityIcons
          name="lightning-bolt-circle"
          size={22}
          color={colors.primary[700]}
        />
      ),
    },
    4: {
      title: "Atenção",
      icon: (
        <AntDesign
          name="exclamationcircle"
          size={22}
          color={colors.secondary[700]}
        />
      ),
    },
    5: {
      title: "Ativo",
      icon: (
        <MaterialIcons
          name="radio-button-on"
          size={22}
          color={colors.green[400]}
        />
      ),
    },
  };

  const [telemetry, setTelemetry] = useState<ITelemetry | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const response = await api.post(
            "/Equipamento/DetalhamentoDispositivoTelemetria",
            {
              codigoEquipamento: params.codigoEquipamento,
            }
          );

          console.log(response.data);

          isActive && setTelemetry(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) console.log("Error:", error);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Dispositivo de Telemetria" />

      <ScrollView
        bg={colors.shape}
        flex={1}
        width="full"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        <VStack marginBottom="24px" paddingX="16px" width="full">
          <HStack marginTop="16px">
            <Box w="50%">
              <DetailsTitle title="Nº de série" />
              <DetailsDescription title={telemetry ? telemetry.serial : ""} />
            </Box>

            <Box>
              <DetailsTitle title="ID" />
              <DetailsDescription title={telemetry ? telemetry.serial : ""} />
            </Box>
          </HStack>

          <HStack marginTop="16px">
            <Box w="50%">
              <DetailsTitle title="Chave de segurança" />
              <DetailsDescription title={telemetry ? telemetry.chave : ""} />
            </Box>

            <Box>
              <DetailsTitle title="Versão de firmware" />
              <DetailsDescription title={telemetry ? telemetry.firmware : ""} />
            </Box>
          </HStack>
        </VStack>

        <HeaderDefault title="Registros" mb="8px" />

        <Item title="Última atualização" mb="8px">
          <Text
            color="blue.700"
            fontSize="16px"
            fontFamily="Roboto_400Regular"
            isTruncated
          >
            {telemetry ? telemetry.dataUltimaAtualizacao : ""}
          </Text>
        </Item>

        <Item title="Ativa desde">
          <Text
            color="blue.700"
            fontSize="16px"
            fontFamily="Roboto_400Regular"
            isTruncated
          >
            {telemetry ? telemetry.dataAtivacao : ""}
          </Text>
        </Item>

        <Center mt="16px">
          <Box flexWrap="wrap" w="331px" flexDirection="row">
            <Signals
              icon={
                <MaterialIcons
                  name="bluetooth-connected"
                  color={THEME.colors.blue[700]}
                  size={22}
                />
              }
              title="Conectado"
              mr="10px"
              onPress={() => {}}
            />

            <Signals
              icon={
                <FontAwesome
                  name="gears"
                  color={THEME.colors.blue[700]}
                  size={22}
                />
              }
              title="Teste do Dispositivo"
              onPress={() => {}}
            />

            <Signals
              icon={telemetry && status[telemetry.status].icon}
              title="Status"
              value={telemetry ? status[telemetry.status].title : ""}
              mt="10px"
              onPress={() => {}}
            />

            <Signals
              icon={
                <FontAwesome5
                  name="battery-full"
                  color={THEME.colors.green[400]}
                  size={22}
                />
              }
              title="Nível de bateria"
              value={telemetry ? `${telemetry.bat.toString()} %` : ""}
              ml="10px"
              mt="10px"
              onPress={() => {}}
            />

            <Signals
              icon={
                <FontAwesome5
                  name="wifi"
                  color={THEME.colors.green[400]}
                  size={22}
                />
              }
              title="Sinal de Wi-fi"
              value={telemetry ? `${telemetry.wfl.toString()} %` : ""}
              mt="10px"
              onPress={() => {}}
            />

            <Signals
              icon={
                <FontAwesome5
                  name="signal"
                  color={THEME.colors.green[400]}
                  size={22}
                />
              }
              title="Sinal de dados móveis"
              value={telemetry ? `${telemetry.slt.toString()} %` : ""}
              mt="10px"
              ml="10px"
              onPress={() => {}}
            />
          </Box>
        </Center>
      </ScrollView>
    </VStack>
  );
}
