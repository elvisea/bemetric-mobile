import React, { ReactNode } from "react";

import { Container } from "./styles";

type Props = {
  children: ReactNode;
};

function DrawerContainer({ children }: Props) {
  return <Container showsVerticalScrollIndicator={false}>{children}</Container>;
}

export { DrawerContainer };
