import React, { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Box, HStack, IconButton, ScrollView, Text, VStack } from "native-base";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import axios from "axios";

import api from "@services/api";
import { THEME } from "@theme/theme";

import IconSnapshot from "@assets/snapshot.svg";
import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";

import { IEquipmentDetails } from "@interfaces/IEquipmentDetails";

import { Item } from "@components/Item";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";
import { DetailsTitle } from "@components/EquipmentDetails/Typography/DetailsTitle";
import { DetailsDescription } from "@components/EquipmentDetails/Typography/DetailsDescription";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

interface IData {
  hodometro: number;
  horimetro: number;
  status: number;
  velocimetro: number;
}

export function Equipament() {
  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("Equipament Screen Params:", params);

  const { colors } = THEME;

  const [data, setData] = useState<IData | null>(null);
  const [equipment, setEquipment] = useState<IEquipmentDetails | null>(null);

  async function getSnapshotData() {
    try {
      const response = await api.post(
        "/Equipamento/DadosInstantaneosDispositivoTelemetria",
        {
          codigoEquipamento: params.codigoEquipamento,
        }
      );

      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getSnapshotData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const response = await api.post("/Equipamento/ObterLista", {
            codigoEquipamento: params.codigoEquipamento,
          });

          if (isActive) setEquipment(response.data[0]);
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
    <ScrollView flex={1} width="full" bg={colors.shape}>
      <DetailsHeader title="Equipamento" />

      <VStack marginBottom="24px" paddingX="16px" width="full">
        <Box marginTop="16px">
          <DetailsTitle title="Nome do equipamento" />
          <DetailsDescription
            title={equipment ? equipment.nomeEquipamento : ""}
          />
        </Box>

        <Box marginTop="16px">
          <DetailsTitle title="Nome do cliente" />
          <DetailsDescription title={equipment ? equipment.nomeCliente : ""} />
        </Box>

        <Box marginTop="16px">
          <DetailsTitle title="Agrupamento" />
          <DetailsDescription
            title={equipment ? equipment.nomeEquipamento : ""}
          />
        </Box>

        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Tipo" />
            <DetailsDescription
              title={equipment ? equipment.tipoEquipamento : ""}
            />
          </Box>

          <Box>
            <DetailsTitle title="Data de aquisição" />
            <DetailsDescription
              title={equipment ? equipment.dataAquisicaoFormatado : ""}
            />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Placa" />
            <DetailsDescription title={equipment ? equipment.placa : ""} />
          </Box>

          <Box>
            <DetailsTitle title="Identificador" />
            <DetailsDescription
              title={equipment ? equipment.identificador : ""}
            />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Modelo" />
            <DetailsDescription title={equipment ? equipment.modelo : ""} />
          </Box>

          <Box>
            <DetailsTitle title="Ano" />
            <DetailsDescription title={equipment ? equipment.ano : ""} />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Horímetro inicial" />
            <DetailsDescription
              title={
                equipment ? `${equipment.horimetroIncial.toString()} horas` : ""
              }
            />
          </Box>

          <Box>
            <DetailsTitle title="Hodômetro inicial" />
            <DetailsDescription
              title={
                equipment ? `${equipment.hodometroIncial.toString()} km` : ""
              }
            />
          </Box>
        </HStack>
      </VStack>

      <Item
        icon={<IconSnapshot />}
        title="Dados instantâneos"
        color="blue.700"
        mb="8px"
      >
        <IconButton
          onPress={getSnapshotData}
          icon={
            <FontAwesome name="refresh" color={colors.blue[700]} size={26} />
          }
        />
      </Item>

      <Item icon={<IconSpeedometer />} title="Velocimetro" mb="8px">
        <Text
          color="#0FD329"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {`${data?.velocimetro} Km/h`}
        </Text>
      </Item>

      <Item
        icon={<FontAwesome name="power-off" color="#878787" size={22} />}
        title="Status"
        mb="8px"
      >
        <Text
          color="blue.700"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data?.status === 1 ? "Ligado" : "Desligado"}
        </Text>
      </Item>

      <Item icon={<IconHourMeter />} title="Horímetro" mb="8px">
        <Text
          color="#0FD329"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.horimetro} horas` : ""}
        </Text>
      </Item>

      <Item
        icon={<Ionicons name="speedometer-outline" color="#878787" size={22} />}
        title="Hodômetro"
        mb="16px"
      >
        <Text
          color="#0FD329"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.hodometro} kms` : ""}
        </Text>
      </Item>
    </ScrollView>
  );
}
