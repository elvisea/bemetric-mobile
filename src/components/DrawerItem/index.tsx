import React from "react";

import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

import { THEME } from "@theme/theme";
import { IconMenuDrawer } from "@components/IconMenuDrawer";

type Props = TouchableOpacityProps & {
  icon: JSX.Element;
  title: string;
  color?: string;
  circle?: string;
  background?: string;
};

function DrawerItem({
  icon,
  title,
  background = "#FFF",
  color = THEME.colors.blue[700],
  circle = THEME.colors.blue[700],
  ...rest
}: Props) {
  return (
    <Container background={background} activeOpacity={0.75} {...rest}>
      <IconMenuDrawer bg={circle} icon={icon} />
      <Title color={color}>{title}</Title>
    </Container>
  );
}

export { DrawerItem };
