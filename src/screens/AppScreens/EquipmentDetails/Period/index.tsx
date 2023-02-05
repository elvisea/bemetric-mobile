import * as React from "react";
import { VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import { THEME } from "@theme/theme";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

export function Period() {
  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("Period Screen Params:", params);

  return (
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <DetailsHeader title="Periodo de permanência" />
    </VStack>
  );
}
