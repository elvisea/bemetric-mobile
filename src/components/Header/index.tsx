import React from "react";
import { Feather } from "@expo/vector-icons";

import { Container, Icon } from "./styles";
import { IconButton } from "native-base";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  functionIcon: () => void;
};

export function Header({ icon, functionIcon }: Props) {
  return (
    <Container>
      <IconButton icon={<Icon name={icon} />} onPress={functionIcon} />
    </Container>
  );
}
