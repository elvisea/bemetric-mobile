import * as React from "react";
import { THEME } from "@theme/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Description,
  Title,
  ImageContainer,
  ValueText,
  HeaderView,
  Row,
  StackView,
  Content,
} from "../styles";

interface ICustomBox {
  title: string;
  icon: React.ReactNode;
  totalEquip?: number;
  movement?: number;
  speedExcd?: number;
  stopON: number;
  stayExcd?: number;
  stopOFF: number;
  stayObd?: number;
}

export function CustomBoxRegister({
  title,
  icon,
  totalEquip,
  movement,
  speedExcd,
  stopON,
  stayExcd,
  stopOFF,
  stayObd,
}: ICustomBox) {
  return (
    <Content>
      <HeaderView>
        <ImageContainer>{icon}</ImageContainer>
        <Title>{title}</Title>
      </HeaderView>

      {totalEquip || totalEquip === 0 ? (
          <Row>
            <Description>Total de equipamentos</Description>
            <ValueText>{totalEquip}</ValueText>
          </Row>
      ): null}

      <Row>
        <Description>Parado ignição ligada</Description>
        <StackView>
          <ValueText>{stopON}</ValueText>
          <MaterialCommunityIcons name="bell-ring" size={15} color={THEME.colors.yellow[100]} />
        </StackView>
      </Row>

      {stayObd || stayObd === 0 ? (
          <Row>
            <Description>Permanência obedecida</Description>
            <StackView>
              <ValueText>{stayObd}</ValueText>
              <Ionicons name="flag" size={15} color={THEME.colors.blue[700]} />
            </StackView>
          </Row>
      ): null}

      {movement || movement === 0 ? (
          <Row>
            <Description>Em movimento</Description>
            <StackView>
              <ValueText>{movement}</ValueText>
              <Ionicons name="flag" size={15} color={THEME.colors.blue[700]} />
            </StackView>
          </Row>
      ): null}

      <Row>
        <Description>Parado ignição desligada</Description>
        <StackView>
          <ValueText>{stopOFF}</ValueText>
          <MaterialCommunityIcons name="bell-ring" size={15} color={THEME.colors.yellow[100]} />
        </StackView>
      </Row>

      {stayExcd || stayExcd === 0 ? (
          <Row>
            <Description>Permanência excedida</Description>
            <StackView>
              <ValueText>{stayExcd}</ValueText>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </StackView>
          </Row>
      ): null}

      {speedExcd || speedExcd === 0 ? (
          <Row>
            <Description>Velocidade excedida</Description>
            <StackView>
              <ValueText>{speedExcd}</ValueText>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </StackView>
          </Row>
      ): null}
    </Content>
  );
}