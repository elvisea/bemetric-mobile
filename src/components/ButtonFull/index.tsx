import React from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

import { THEME } from "@theme/theme";

type Props = IButtonProps & {
  title: string;
};

export function ButtonFull({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={`${RFValue(77)}px`}
      bg={THEME.colors.blue[700]}
      borderWidth={0}
      borderRadius={0}
      _spinner={{ size: 30 }}
      _loading={{ opacity: 1 }}
      {...rest}
    >
      <Text color="white" fontSize={20} fontFamily="Roboto_400Regular">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
