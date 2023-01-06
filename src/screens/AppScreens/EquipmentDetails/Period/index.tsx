import * as React from "react";
import { VStack } from "native-base";

import { EquipmentDetailsHeader } from "@components/EquipmentDetailsHeader";

import { THEME } from "@theme/theme";

export function Period() {
  return (
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <EquipmentDetailsHeader title="Periodo de permanência" />
    </VStack>
  );
}
