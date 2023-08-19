import React, { ReactNode } from "react";
import { Text, VStack } from "native-base";

import { TouchableProps } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

import { Container } from "./styles";

type Props = TouchableProps & {
  icon: ReactNode;
  title: string;
  description: string;
};

export function EquipmentCard({ icon, title, description, ...rest }: Props) {
  return (
    <Container activeOpacity={0.5} {...rest}>
      {icon}
      <VStack
        ml={`${RFValue(16)}px`}
        h="full"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Text
          color="#686868"
          fontSize={`${RFValue(16)}px`}
          fontFamily={THEME.fonts.Roboto_400Regular}
          isTruncated
        >
          {title}
        </Text>

        <Text
          color="#686868"
          fontSize={`${RFValue(10)}px`}
          fontFamily={THEME.fonts.Roboto_400Regular}
          isTruncated
        >
          {description}
        </Text>
      </VStack>
    </Container>
  );
}
