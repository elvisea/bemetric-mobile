import React, { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Box, Center, HStack, VStack } from "native-base";

import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import axios from "axios";
import api from "@services/api";
import { THEME } from "@theme/theme";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import { DetailsTitle } from "@components/EquipmentDetails/Typography/DetailsTitle";
import { DetailsDescription } from "@components/EquipmentDetails/Typography/DetailsDescription";

import { Registry } from "@components/EquipmentDetails/Registry";
import { Signals } from "@components/EquipmentDetails/Signals";
import { ITelemetry } from "@interfaces/ITelemetry";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

export function TelemetryDevice() {
  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("params TelemetryDevice", params);

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

          setTelemetry(response.data);
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
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <DetailsHeader title="Dispositivo de Telemetria" />

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

      <DetailsHeader title="Registros" />

      <Registry
        title="Última atualização"
        date={telemetry ? telemetry.dataUltimaAtualizacao : ""}
        mt={1.5}
      />

      <Registry
        title="Ativa desde"
        date={telemetry ? telemetry.dataAtivacao : ""}
        mt={1.5}
      />

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
            icon={
              <MaterialIcons
                name="radio-button-on"
                color={
                  telemetry
                    ? telemetry.status === 0
                      ? THEME.colors.red[700]
                      : THEME.colors.green[400]
                    : ""
                }
                size={22}
              />
            }
            title="Status"
            value={
              telemetry ? (telemetry.status === 0 ? "Inativo" : "Ativo") : ""
            }
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
    </VStack>
  );
}
