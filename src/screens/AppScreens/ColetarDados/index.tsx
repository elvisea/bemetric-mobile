import React from "react";
import { Cabecalho } from "@components/Cabecalho";

import { Container, Content, Title } from "./styles";

function ColetarDados() {
  return (
    <Container>
      <Cabecalho hasIcon={false} />

      <Content>
        <Title>Coletar Dados</Title>
      </Content>
    </Container>
  );
}

export { ColetarDados };
