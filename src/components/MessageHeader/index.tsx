import React from "react";
import { IconButton, HStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

import { Icon } from "./styles";

type Props = {
  goback: () => void;
};

export function MessageHeader({ goback }: Props) {
  return (
    <HStack
      w="full"
      h={`${RFValue(82)}px`}
      bg={THEME.colors.blue[700]}
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton icon={<Icon name="arrow-back" />} onPress={goback} />
    </HStack>
  );
}
