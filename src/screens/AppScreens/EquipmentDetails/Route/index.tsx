import * as React from "react";
import { VStack } from "native-base";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import { THEME } from "@theme/theme";

export function Route() {
  return (
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <DetailsHeader title="Trajeto" />
    </VStack>
  );
}
