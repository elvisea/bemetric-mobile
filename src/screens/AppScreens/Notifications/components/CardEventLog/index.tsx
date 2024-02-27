import * as React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { PropsCountKey } from "../../types";

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

const render = (props: PropsCountKey) => {
  switch (props.title) {
    case "Outras Localizações":
      return (
        <>
          <Row>
            <Label>Permanência Excedida</Label>
            <Content>
              <Value>{props.permanence.exceeded}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Permanência Obedecida</Label>
            <Content>
              <Value>{props.permanence.obeyed}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>
        </>
      );

    case "Em Geocercas":
      return (
        <>
          <Row>
            <Label>Permanência Excedida</Label>
            <Content>
              <Value>{props.permanence.exceeded}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Permanência Obedecida</Label>
            <Content>
              <Value>{props.permanence.obeyed}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Ligada</Label>
            <Content>
              <Value>{props.ignition.on}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Desligada</Label>
            <Content>
              <Value>{props.ignition.off}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>
        </>
      );

    case "Em Pontos de Interesse":
      return (
        <>
          <Row>
            <Label>Permanência Excedida</Label>
            <Content>
              <Value>{props.permanence.exceeded}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Permanência Obedecida</Label>
            <Content>
              <Value>{props.permanence.obeyed}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Ligada</Label>
            <Content>
              <Value>{props.ignition.on}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Desligada</Label>
            <Content>
              <Value>{props.ignition.off}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>
        </>
      );

    case "Equipamento":
      return (
        <>
          <Row>
            <Label>Total de equipamentos</Label>
            <Value>{props.amount}</Value>
          </Row>

          <Row>
            <Label>Em Movimento</Label>
            <Content>
              <Value>{props.movement}</Value>
              <Ionicons name="flag" size={15} color={THEME.colors.blue[700]} />
            </Content>
          </Row>

          <Row>
            <Label>Velocidade Excedida</Label>
            <Content>
              <Value>{props.speed}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Ligada</Label>
            <Content>
              <Value>{props.ignition.on}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>

          <Row>
            <Label>Parado Ignição Desligada</Label>
            <Content>
              <Value>{props.ignition.off}</Value>
              <MaterialCommunityIcons
                name="bell-ring"
                size={15}
                color={THEME.colors.yellow[100]}
              />
            </Content>
          </Row>
        </>
      );
    default:
      break;
  }
};

export function CardEventLog(props: PropsCountKey) {
  return (
    <Container>
      <Header>
        <SquareIcon>{props.icon}</SquareIcon>
        <Title>{props.title}</Title>
      </Header>

      {render(props)}
    </Container>
  );
}
