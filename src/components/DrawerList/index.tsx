import React, { ReactNode } from "react";

import { Container } from "./styles";

type Props = {
  children: ReactNode;
};

function DrawerList({ children }: Props) {
  return <Container>{children}</Container>;
}

export { DrawerList };
