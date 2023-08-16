import React from "react";
import { TouchableOpacityProps } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Text } from "native-base";

import { Container } from "./styles";
import { THEME } from "@theme/theme";

interface IProps extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
}

function SelectButton({ title, isActive, ...rest }: IProps) {
  const { colors } = THEME;
  return (
    <Container isActive={isActive} activeOpacity={0.9} {...rest}>
      <Text
        fontSize={16}
        color={isActive ? colors.blue[700] : colors.gray[250]}
      >
        {title}
      </Text>

      <FontAwesome name="angle-down" size={24} color={THEME.colors.blue[700]} />
    </Container>
  );
}

export { SelectButton };
