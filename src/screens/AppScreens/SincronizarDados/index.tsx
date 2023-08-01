import React from "react";
import { Cabecalho } from "@components/Cabecalho";

import { Container, Content, Title } from "./styles";

function SincronizarDados() {
  return (
    <Container>
      <Cabecalho hasIcon={false} />

      <Content>
        <Title>Sincronizar Dados</Title>
      </Content>
    </Container>
  );
}

export { SincronizarDados };
