import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

import { Text } from "native-base";

import { Button } from "./styles";
import { THEME } from "@theme/theme";

type Props = TouchableOpacityProps & {
  mt?: number;
  mb?: number;
  date?: string;
};

export function ButtonDate({ mt = 0, mb = 0, date, ...rest }: Props) {
  const { colors } = THEME;

  return (
    <Button activeOpacity={0.5} {...rest}>
      <Text fontSize={16} color="#717171">
        {date}
      </Text>

      <FontAwesome5 size={24} name="calendar-alt" color={colors.blue[700]} />
    </Button>
  );
}
