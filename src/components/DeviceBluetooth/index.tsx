import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { Container, Content, Subtitle, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface IProps extends TouchableOpacityProps {
  id: string;
  name: string | null;
}

const DeviceBluetooth: React.FC<IProps> = ({ id, name, ...rest }) => {
  return (
    <Container activeOpacity={0.75} {...rest}>
      <FontAwesome5 name="bluetooth" size={34} color={THEME.colors.blue[700]} />

      <Content>
        <Title>{name ? name : "Dispositivo sem nome"}</Title>
        <Subtitle>{id}</Subtitle>
      </Content>

      <FontAwesome5
        name="arrow-right"
        size={30}
        color={THEME.colors.blue[700]}
      />
    </Container>
  );
};

export { DeviceBluetooth };
