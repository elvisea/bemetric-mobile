import * as React from "react";
import { IconButton, VStack } from "native-base";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import { THEME } from "@theme/theme";
import { Icon } from "./styles";

export function TelemetryData() {
  return (
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <DetailsHeader title="Dados de telemetria">
        <IconButton icon={<Icon name="sliders" />} onPress={() => {}} />
      </DetailsHeader>
    </VStack>
  );
}
