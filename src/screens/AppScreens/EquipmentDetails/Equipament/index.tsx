import { Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { IconButton, ScrollView, Text, VStack } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";

import IconSnapshot from "@assets/snapshot.svg";
import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";

import { formatHour } from "@utils/formatHours";

import { IData } from "./interfaces/IData";
import { IParams } from "../interfaces/IEquipamentDetails";
import { IEquipmentDetails } from "./interfaces/IEquipamentDetails";

import { Item } from "@components/Item";

import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RowInformation } from "@components/RowInformation";

export function Equipament() {
  const route = useRoute();
  const { params } = route.params as IParams;

  const { colors } = THEME;

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<IData | null>(null);
  const [equipment, setEquipment] = useState<IEquipmentDetails | null>(null);

  async function getSnapshotData() {
    try {
      const response = await api.post(
        "/Equipamento/DadosInstantaneosDispositivoTelemetria",
        {
          codigoEquipamento: params.codigoEquipamento,
        },
      );

      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && getSnapshotData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setIsLoading(true);

          const response = await api.post("/Equipamento/ObterLista", {
            codigoEquipamento: params.codigoEquipamento,
          });

          if (isActive) setEquipment(response.data[0]);
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

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Equipamento" />

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && (
        <ScrollView
          flex={1}
          width="full"
          bg={colors.shape}
          showsVerticalScrollIndicator={false}
        >
          <RowInformation
            mt={16}
            primaryTitle="Nome do equipamento"
            primaryDescription={equipment ? equipment.nomeEquipamento : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Nome do Cliente"
            primaryDescription={equipment ? equipment.nomeCliente : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Agrupamento"
            primaryDescription={equipment ? equipment.nomeEquipamento : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Tipo"
            primaryDescription={equipment ? equipment.tipoEquipamento : "-"}
            secondaryTitle="Data de aquisição"
            secondaryDescription={
              equipment ? equipment.dataAquisicaoFormatado : "-"
            }
          />

          <RowInformation
            mt={12}
            primaryTitle="Placa"
            primaryDescription={equipment ? equipment.placa : "-"}
            secondaryTitle="Identificador"
            secondaryDescription={equipment ? equipment.identificador : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Modelo"
            primaryDescription={equipment ? equipment.modelo : "-"}
            secondaryTitle="Ano"
            secondaryDescription={equipment ? equipment.ano : "-"}
          />

          <RowInformation
            mt={12}
            mb={16}
            primaryTitle="Horímetro inicial"
            primaryDescription={
              equipment ? `${equipment.horimetroIncial.toString()} horas` : "-"
            }
            secondaryTitle="Hodômetro inicial"
            secondaryDescription={
              equipment ? `${equipment.hodometroIncial.toString()} km` : ""
            }
          />

          <Item
            icon={<IconSnapshot />}
            title="Dados instantâneos"
            color="blue.700"
            mb="8px"
          >
            <IconButton
              onPress={getSnapshotData}
              icon={
                <FontAwesome
                  name="refresh"
                  color={colors.blue[700]}
                  size={26}
                />
              }
            />
          </Item>

          <Item icon={<IconSpeedometer />} title="Velocimetro" mb="8px">
            <Text
              color={colors.green[350]}
              fontSize={`${RFValue(16)}px`}
              fontFamily="Roboto_400Regular"
              isTruncated
            >
              {data ? `${data.velocimetro} Km/h` : ""}
            </Text>
          </Item>

          <Item
            icon={<FontAwesome name="power-off" color="#878787" size={22} />}
            title="Status"
            mb="8px"
          >
            <Text
              color="blue.700"
              fontSize={`${RFValue(16)}px`}
              fontFamily="Roboto_400Regular"
              isTruncated
            >
              {data ? (data.status === 1 ? "Ligado" : "Desligado") : ""}
            </Text>
          </Item>

          <Item icon={<IconHourMeter />} title="Horímetro" mb="8px">
            <Text
              color={colors.green[350]}
              fontSize={`${RFValue(16)}px`}
              fontFamily="Roboto_400Regular"
              isTruncated
            >
              {data ? formatHour(data.horimetroFormatado) : ""}
            </Text>
          </Item>

          <Item
            icon={
              <Ionicons name="speedometer-outline" color="#878787" size={22} />
            }
            title="Hodômetro"
            mb="16px"
          >
            <Text
              color={colors.green[350]}
              fontSize={`${RFValue(16)}px`}
              fontFamily="Roboto_400Regular"
              isTruncated
            >
              {data ? `${data.hodometro} kms` : ""}
            </Text>
          </Item>
        </ScrollView>
      )}
    </VStack>
  );
}
