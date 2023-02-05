import * as React from "react";
import { VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import axios from "axios";
import api from "@services/api";

import { THEME } from "@theme/theme";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

export function Route() {
  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("Route Screen Params:", params);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const response = await api.post("/Equipamento/TrajetoApp", {
            codigoEquipamento: params.codigoEquipamento,
          });

          console.log(response.data);

          // setEquipment(response.data[0]);
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
      <DetailsHeader title="Trajeto" />
    </VStack>
  );
}
