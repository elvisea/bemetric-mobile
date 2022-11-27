import React from "react";
import { Heading } from "native-base";

import { THEME } from "@theme/theme";
import { Container } from "./styles";

type Props = {
  name: string;
};

export function HeaderWelcome({ name }: Props) {
  return (
    <Container>
      <Heading fontSize="sm" fontFamily={THEME.fonts.Roboto_500Medium}>
        Olá, {name}
        {"\n"}Seja BEM-VINDO :)
      </Heading>
    </Container>
  );
}
