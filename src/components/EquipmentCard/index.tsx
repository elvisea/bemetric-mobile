import React from "react";
import { TouchableOpacityProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Container, Content, Info, Title } from "./styles";

type IProps = TouchableOpacityProps & {
  isSelected: boolean;
  nomeEquipamento: string;
  identificador: string;
  tipoEquipamento: string;
  placa: string;
};

const EquipmentCard: React.FC<IProps> = ({
  isSelected,
  nomeEquipamento,
  identificador,
  tipoEquipamento,
  placa,
  ...rest
}) => {
  return (
    <Container activeOpacity={0.75} isSelected={isSelected} {...rest}>
      <FontAwesome name="gears" size={30} color={THEME.colors.blue[700]} />

      <Content>
        <Title>{nomeEquipamento}</Title>
        <Info>{`Identificador: ${identificador}`}</Info>
        <Info>{`Tipo: ${tipoEquipamento}`}</Info>
        <Info>{`Placa: ${placa}`}</Info>
      </Content>
    </Container>
  );
};

export { EquipmentCard };
