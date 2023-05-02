import React from "react";
import { TouchableOpacityProps } from "react-native";

import { OutsideBox, InsideBox, Container, Title } from "./styles";

interface IMarkerItemProps extends TouchableOpacityProps {
  title: string;
  isChecked: boolean;
}

function MarkerItem({ title, isChecked, ...rest }: IMarkerItemProps) {
  return (
    <Container activeOpacity={0.5} {...rest}>
      <OutsideBox>{isChecked && <InsideBox />}</OutsideBox>

      <Title>{title}</Title>
    </Container>
  );
}

export { MarkerItem };
