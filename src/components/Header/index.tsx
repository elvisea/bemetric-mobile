import React from "react";

import { IconButton } from "native-base";

import { Feather } from "@expo/vector-icons";

import { Container, Icon, ImageLogo, LogoContainer } from "./styles";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  functionIcon: () => void;
};

export function Header({ icon, functionIcon }: Props) {
  return (
    <Container>
      <IconButton icon={<Icon name={icon} />} onPress={functionIcon} />

      <LogoContainer>
        <ImageLogo source={require("@assets/b2k.png")} />
      </LogoContainer>
    </Container>
  );
}
