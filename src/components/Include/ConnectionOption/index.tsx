import React from "react";
import { Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

type IConnectionOption = TouchableOpacityProps & {
  mt?: number;
  title: string;
};

function ConnectionOption({ title, mt = 0, ...rest }: IConnectionOption) {
  return (
    <Container mt={mt} activeOpacity={0.5} {...rest}>
      <Text color="blue.700" fontSize="15px" fontFamily="Roboto_400Regular">
        {title}
      </Text>

      <MaterialCommunityIcons
        name="arrow-right"
        size={22}
        color={THEME.colors.blue[700]}
      />
    </Container>
  );
}

export { ConnectionOption };
