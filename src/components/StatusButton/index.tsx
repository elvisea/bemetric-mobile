import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Content, Title, Value } from "./styles";

type StatusButtonProps = TouchableOpacityProps & {
  title: string;
  value?: string;

  icon: ReactNode;

  width?: string;

  mt?: number;
  mb?: number;
};

function StatusButton({
  title,
  value,

  icon,
  width = "100",

  mt = 0,
  mb = 0,
  ...rest
}: StatusButtonProps) {
  return (
    <Container
      style={{ elevation: 4 }}
      width={width}
      mt={mt}
      mb={mb}
      activeOpacity={0.5}
      {...rest}
    >
      <Content>
        {icon}
        {value && <Value>{value}</Value>}
      </Content>
      <Title>{title}</Title>
    </Container>
  );
}

export { StatusButton };
