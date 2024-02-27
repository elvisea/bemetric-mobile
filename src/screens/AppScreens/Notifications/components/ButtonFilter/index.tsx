import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

const ButtonFilter: React.FC<TouchableOpacityProps> = ({ ...rest }) => {
  return (
    <Container {...rest}>
      <FontAwesome name="sliders" size={24} color={THEME.colors.blue[700]} />
    </Container>
  );
};

export { ButtonFilter };
