import React from "react";
import { Container, Content, Title } from "./styles";
import { Cabecalho } from "@components/Cabecalho";

function ExportarDados() {
  return (
    <Container>
      <Cabecalho hasIcon={false} />

      <Content>
        <Title>Exportar Dados</Title>
      </Content>
    </Container>
  );
}

export { ExportarDados };
