import React, { ReactNode } from "react";
import { ViewProps } from "react-native";

import { Container } from "./styles";

interface Props extends ViewProps {
  children: ReactNode;
}

export function AccordionSession({ children, ...rest }: Props) {
  return <Container {...rest}>{children}</Container>;
}
