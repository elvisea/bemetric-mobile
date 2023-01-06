import React, { useCallback, useState } from "react";
import { Box, HStack, IconButton, ScrollView, Text, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import {
  FontAwesome,
  Ionicons,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";

import axios from "axios";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { IEquipmentDetails } from "@interfaces/IEquipmentDetails";

import { SnapshotDataItem } from "@components/SnapshotDataItem";
import { EquipmentDetailsTitle } from "@components/EquipmentDetailsTitle";
import { EquipmentDetailsHeader } from "@components/EquipmentDetailsHeader";
import { EquipmentDetailsDescription } from "@components/EquipmentDetailsDescription";

interface IParams {
  codigoEquipamento: number;
}

export function Equipament() {
  const route = useRoute();
  const params = route.params as IParams;

  const [equipment, setEquipment] = useState<IEquipmentDetails | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const response = await api.post("/Equipamento/ObterLista", {
            codigoEquipamento: params.codigoEquipamento,
          });

          setEquipment(response.data[0]);
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
    <ScrollView flex={1} width="full" bg={THEME.colors.shape}>
      <EquipmentDetailsHeader title="Equipamento">
        <Box h="full" justifyContent="center" alignItems="center">
          <Text
            color="gray.50"
            fontSize="12px"
            fontFamily="Montserrat_400Regular"
          >
            Última atualização
          </Text>

          <Text
            color="gray.50"
            fontSize="12px"
            fontFamily="Montserrat_400Regular"
          >
            24/11/2021 - 15:31
          </Text>
        </Box>
      </EquipmentDetailsHeader>

      <VStack marginBottom="24px" paddingX="16px" width="full">
        <Box marginTop="16px">
          <EquipmentDetailsTitle title="Nome do equipamento" />
          <EquipmentDetailsDescription
            title={equipment ? equipment.nomeEquipamento : ""}
          />
        </Box>

        <Box marginTop="16px">
          <EquipmentDetailsTitle title="Nome do cliente" />
          <EquipmentDetailsDescription
            title={equipment ? equipment.nomeCliente : ""}
          />
        </Box>

        <Box marginTop="16px">
          <EquipmentDetailsTitle title="Agrupamento" />
          <EquipmentDetailsDescription title={"Nome Agrupamento"} />
        </Box>

        <HStack marginTop="16px">
          <Box w="50%">
            <EquipmentDetailsTitle title="Tipo" />
            <EquipmentDetailsDescription
              title={equipment ? equipment.tipoEquipamento : ""}
            />
          </Box>

          <Box>
            <EquipmentDetailsTitle title="Data de aquisição" />
            <EquipmentDetailsDescription
              title={
                equipment
                  ? new Date(equipment.dataAquisicao).toLocaleString()
                  : ""
              }
            />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <EquipmentDetailsTitle title="Placa" />
            <EquipmentDetailsDescription
              title={equipment ? equipment.placa : ""}
            />
          </Box>

          <Box>
            <EquipmentDetailsTitle title="Identificador" />
            <EquipmentDetailsDescription
              title={
                equipment
                  ? new Date(equipment.identificador).toLocaleString()
                  : ""
              }
            />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <EquipmentDetailsTitle title="Modelo" />
            <EquipmentDetailsDescription
              title={equipment ? equipment.modelo : ""}
            />
          </Box>

          <Box>
            <EquipmentDetailsTitle title="Ano" />
            <EquipmentDetailsDescription
              title={equipment ? equipment.ano : ""}
            />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <EquipmentDetailsTitle title="Horímetro inicial" />
            <EquipmentDetailsDescription
              title={
                equipment ? `${equipment.horimetroIncial.toString()} horas` : ""
              }
            />
          </Box>

          <Box>
            <EquipmentDetailsTitle title="Hodômetro inicial" />
            <EquipmentDetailsDescription
              title={
                equipment ? `${equipment.hodometroIncial.toString()} km` : ""
              }
            />
          </Box>
        </HStack>
      </VStack>

      <SnapshotDataItem
        icon={<Entypo name="gauge" color={THEME.colors.blue[700]} size={22} />}
        title="Dados instantâneos"
        color="blue.700"
        mb="8px"
      >
        <IconButton
          onPress={() => { }}
          icon={
            <FontAwesome
              name="refresh"
              color={THEME.colors.blue[700]}
              size={26}
            />
          }
        />
      </SnapshotDataItem>

      <SnapshotDataItem
        icon={<Ionicons name="speedometer" color="#878787" size={22} />}
        title="Velocimetro"
        mb="8px"
      >
        <Text
          color="#0FD329"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          20 Km/h
        </Text>
      </SnapshotDataItem>

      <SnapshotDataItem
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
          Ligado
        </Text>
      </SnapshotDataItem>

      <SnapshotDataItem
        icon={<SimpleLineIcons name="speedometer" color="#878787" size={22} />}
        title="Horímetro"
        mb="8px"
      >
        <Text
          color="#0FD329"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          5 horas
        </Text>
      </SnapshotDataItem>

      <SnapshotDataItem
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
          300 km
        </Text>
      </SnapshotDataItem>
    </ScrollView>
  );
}
