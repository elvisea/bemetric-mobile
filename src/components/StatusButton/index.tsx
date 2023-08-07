import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Value } from "./styles";

type StatusButtonProps = TouchableOpacityProps & {
  title: string;
  value?: string;

  mt?: number;
  mb?: number;
};

function StatusButton({
  title,
  value,
  mt = 0,
  mb = 0,
  ...rest
}: StatusButtonProps) {
  return (
    <Container mt={mt} mb={mb} activeOpacity={0.5} {...rest}>
      <Title>{title}</Title>
      {value && <Value>{value}</Value>}
    </Container>
  );
}

export { StatusButton };
