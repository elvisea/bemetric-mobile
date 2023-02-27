import React, { useCallback } from "react";
import { IconButton, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";

import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";

import { Icon } from "./styles";
import { THEME } from "@theme/theme";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

export function ChartTelemetryData() {
  const { colors } = THEME;

  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("ChartTelemetryData Screen Params:", params);

  const fetchData = async () => {
    try {
      const response = await api.post("/Equipamento/DadosTelemetrias");

      console.log("=>", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Dados de telemetria" mb="16px">
        <IconButton icon={<Icon name="sliders" />} onPress={() => {}} />
      </HeaderDefault>
    </VStack>
  );
}
