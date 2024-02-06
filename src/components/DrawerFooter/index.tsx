import React, { ReactNode } from "react";
import { Container, Title } from "./styles";

type Props = {
  title: ReactNode;
};

function DrawerFooter({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export { DrawerFooter };
