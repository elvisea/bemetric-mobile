import * as React from "react";
import { THEME } from "@theme/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Label,
  SquareIcon,
  Title,
  Value,
  Row,
  Content,
} from "./styles";

interface CardEventLogProps {
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

export function CardEventLog({
  title,
  icon,
  totalEquip,
  movement,
  speedExcd,
  stopON,
  stayExcd,
  stopOFF,
  stayObd,
}: CardEventLogProps) {
  return (
    <Container>
      <Header>
        <SquareIcon>{icon}</SquareIcon>
        <Title>{title}</Title>
      </Header>

      {totalEquip || totalEquip === 0 ? (
        <Row>
          <Label>Total de equipamentos</Label>
          <Value>{totalEquip}</Value>
        </Row>
      ) : null}

      <Row>
        <Label>Parado ignição ligada</Label>

        <Content>
          <Value>{stopON}</Value>
          <MaterialCommunityIcons
            name="bell-ring"
            size={15}
            color={THEME.colors.yellow[100]}
          />
        </Content>
      </Row>

      {stayObd || stayObd === 0 ? (
        <Row>
          <Label>Permanência Obedecida</Label>
          <Content>
            <Value>{stayObd}</Value>
            <Ionicons name="flag" size={15} color={THEME.colors.blue[700]} />
          </Content>
        </Row>
      ) : null}

      {movement || movement === 0 ? (
        <Row>
          <Label>Em movimento</Label>
          <Content>
            <Value>{movement}</Value>
            <Ionicons name="flag" size={15} color={THEME.colors.blue[700]} />
          </Content>
        </Row>
      ) : null}

      <Row>
        <Label>Parado ignição desligada</Label>
        <Content>
          <Value>{stopOFF}</Value>
          <MaterialCommunityIcons
            name="bell-ring"
            size={15}
            color={THEME.colors.yellow[100]}
          />
        </Content>
      </Row>

      {stayExcd || stayExcd === 0 ? (
        <Row>
          <Label>Permanência excedida</Label>
          <Content>
            <Value>{stayExcd}</Value>
            <MaterialCommunityIcons
              name="bell-ring"
              size={15}
              color={THEME.colors.yellow[100]}
            />
          </Content>
        </Row>
      ) : null}

      {speedExcd || speedExcd === 0 ? (
        <Row>
          <Label>Velocidade excedida</Label>
          <Content>
            <Value>{speedExcd}</Value>
            <MaterialCommunityIcons
              name="bell-ring"
              size={15}
              color={THEME.colors.yellow[100]}
            />
          </Content>
        </Row>
      ) : null}
    </Container>
  );
}
