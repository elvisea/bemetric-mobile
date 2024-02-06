import { Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { Text, VStack } from "native-base";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";

import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";

import { THEME } from "@theme/theme";

interface IParams {
  url:
    | "GraficoKmRodados"
    | "GraficoHorasLigadas"
    | "GraficoHorasTrabalhadas"
    | "GraficoVelocidadeMedia";
  dataDe: string;
  dataAte: string;
  usaData: boolean;
  tipoIntervalo: number;
  codigoEquipamento: number;
}

interface IChart {
  [index: string]: string | number;
}

export function ChartTelemetryData() {
  const { colors, fonts } = THEME;

  const route = useRoute();
  const params = route.params as IParams;

  const [chart, setChart] = useState<IChart[] | null>(null);

  const tipoDeGrafico = {
    GraficoKmRodados: {
      key: "kmRodados",
      title: "Km Rodados",
    },
    GraficoHorasLigadas: {
      key: "horasLigadas",
      title: "Horas Ligadas",
    },
    GraficoVelocidadeMedia: {
      key: "velocidadeMedia",
      title: "Velocidade Média",
    },
    GraficoHorasTrabalhadas: {
      key: "horasTrabalhadas",
      title: "Horas Trabalhadas",
    },
  };

  const dadosFake = () => {
    let array = [];

    for (let index = 0; index < 30; index += 1) {
      array.push({
        data: `${index + 1}/01`,
        [`${tipoDeGrafico[params.url].key}`]: Math.floor(Math.random() * 100),
      });
    }

    let novo = [];

    for (let index = 0; index < array.length; index += 1) {
      const element = array[index];

      novo.push({
        x: element.data,
        y: element[tipoDeGrafico[params.url].key],
      });
    }

    return novo;
  };

  const formatDataForChart = (array: any[]) => {
    let formatted = [];

    for (let index = 0; index < array.length; index += 1) {
      const element = array[index];

      formatted.push({
        x: element.data,
        y: element[tipoDeGrafico[params.url].key],
      });
    }

    return formatted;
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchDataChart = async () => {
        const data = {
          dataDe: params.dataDe,
          dataAte: params.dataAte,
          usaData: params.usaData,
          tipoIntervalo: params.tipoIntervalo,
          codigoEquipamento: params.codigoEquipamento,
        };

        try {
          const response = await api.post(`/Equipamento/${params.url}`, data);

          isActive && setChart(formatDataForChart(response.data));
        } catch (error) {
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
        }
      };

      fetchDataChart();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title={tipoDeGrafico[params.url].title} />

      <VStack flex={1} alignItems="center" bg={colors.white}>
        {chart && (
          <>
            <VictoryChart
              theme={VictoryTheme.material}
              height={500}
              domainPadding={16}
              containerComponent={
                <VictoryZoomContainer zoomDomain={{ x: [0, 7] }} />
              }
            >
              <VictoryBar
                animate={{ easing: "elastic" }}
                style={{ data: { fill: colors.blue[700], width: 24 } }}
                data={chart}
              />
            </VictoryChart>
            <Text
              mt={8}
              fontSize={16}
              color={colors.blue[700]}
              fontFamily={fonts.Roboto_400Regular}
            >
              Ultimas 24 Horas
            </Text>
          </>
        )}
      </VStack>
    </VStack>
  );
}
