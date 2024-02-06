import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { IconButton, ScrollView, Text, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";

import IconSnapshot from "@assets/snapshot.svg";
import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";

import { formatHour } from "@utils/formatHours";

import { Item } from "@components/Item";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { RowInformation } from "@components/RowInformation";

import { initialState } from "./constants";
import { InputData, Params } from "./types";
import { extractEquipmentData, transformData } from "./functions";

export function Equipament() {
  const route = useRoute();
  const { params } = route.params as Params;

  const { colors } = THEME;

  const [state, setState] = useState(initialState);

  const fetchData = async () => {
    try {
      const [resposta1, resposta2] = await Promise.all([
        await api.post<InputData[]>("/Equipamento/ObterLista", {
          codigoEquipamento: params.codigoEquipamento,
        }),

        await api.post("/Equipamento/DadosInstantaneosDispositivoTelemetria", {
          codigoEquipamento: params.codigoEquipamento,
        }),
      ]);

      setState((prevState) => ({
        ...prevState,
        data: transformData(resposta2.data),
        equipment: extractEquipmentData(resposta1.data[0]),
      }));
    } catch (error) {
      Alert.alert(state.messages[3].title, state.messages[0].subtitle);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const getSnapshotData = async () => {
    try {
      const response = await api.post(
        "/Equipamento/DadosInstantaneosDispositivoTelemetria",
        {
          codigoEquipamento: params.codigoEquipamento,
        },
      );

      setState((prevState) => ({
        ...prevState,
        data: transformData(response.data),
      }));
    } catch (error) {
      Alert.alert(state.messages[3].title, state.messages[0].subtitle);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      isActive && fetchData();
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Equipamento" />

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
        <ScrollView
          flex={1}
          width="full"
          bg={colors.shape}
          showsVerticalScrollIndicator={false}
        >
          <RowInformation
            mt={16}
            primaryTitle="Nome do equipamento"
            primaryDescription={state.equipment ? state.equipment.name : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Nome do Cliente"
            primaryDescription={state.equipment ? state.equipment.client : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Agrupamento"
            primaryDescription={state.equipment ? state.equipment.name : "-"}
          />

          <RowInformation
            mt={12}
            primaryTitle="Tipo"
            primaryDescription={state.equipment ? state.equipment.type : "-"}
            secondaryTitle="Data de aquisição"
            secondaryDescription={
              state.equipment ? state.equipment.acquisition : "-"
            }
          />

          <RowInformation
            mt={12}
            primaryTitle="Placa"
            primaryDescription={state.equipment ? state.equipment.plate : "-"}
            secondaryTitle="Identificador"
            secondaryDescription={
              state.equipment ? state.equipment.identifier : "-"
            }
          />

          <RowInformation
            mt={12}
            primaryTitle="Modelo"
            primaryDescription={state.equipment ? state.equipment.model : "-"}
            secondaryTitle="Ano"
            secondaryDescription={state.equipment ? state.equipment.year : "-"}
          />

          <RowInformation
            mt={12}
            mb={16}
            primaryTitle="Horímetro inicial"
            primaryDescription={
              state.equipment
                ? `${state.equipment.initial.hourmeter.toString()} horas`
                : "-"
            }
            secondaryTitle="Hodômetro inicial"
            secondaryDescription={
              state.equipment
                ? `${state.equipment.initial.odometer.toString()} km`
                : ""
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
              {state.data ? `${state.data.speedometer} Km/h` : ""}
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
              {state.data
                ? state.data.status === 1
                  ? "Ligado"
                  : "Desligado"
                : ""}
            </Text>
          </Item>

          <Item icon={<IconHourMeter />} title="Horímetro" mb="8px">
            <Text
              color={colors.green[350]}
              fontSize={`${RFValue(16)}px`}
              fontFamily="Roboto_400Regular"
              isTruncated
            >
              {state.data ? formatHour(state.data.hourmeterFormatted) : ""}
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
              {state.data ? `${state.data.hourmeter} km` : ""}
            </Text>
          </Item>
        </ScrollView>
      )}
    </VStack>
  );
}
