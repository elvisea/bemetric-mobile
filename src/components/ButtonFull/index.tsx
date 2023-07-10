import React from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function ButtonFull({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={`${RFValue(77)}px`}
      bg="blue.600"
      borderWidth={0}
      borderRadius={0}
      {...rest}
    >
      <Text color="white" fontSize={20} fontFamily="Roboto_400Regular">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
