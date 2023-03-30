import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  color?: string;
};

export function Button({ title, color = "#FFF", ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="blue.700"
      borderColor="white"
      borderWidth={1}
      borderRadius={6}
      {...rest}
    >
      <Text color={color} fontSize={16} fontFamily="Roboto_400Regular">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
