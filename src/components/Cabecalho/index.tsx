import React from "react";
import { IconButton, HStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "@assets/b2k.svg";
import { THEME } from "@theme/theme";

import { Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export function Cabecalho({}: Props) {
  const navigation = useNavigation();

  return (
    <HStack
      w="full"
      h={`${RFValue(82)}px`}
      bg={THEME.colors.blue[700]}
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton
        icon={<Icon name="arrow-back" />}
        onPress={() => navigation.goBack()}
      />

      {/* <Logo /> */}

      <IconButton
        icon={<Icon name="settings" />}
        onPress={() => navigation.goBack()}
      />
    </HStack>
  );
}
