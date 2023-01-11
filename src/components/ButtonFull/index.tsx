import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function ButtonFull({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={77}
      bg="blue.600"
      borderWidth={0}
      borderRadius={0}
      {...rest}
    >
      <Text color="white" fontSize={16} fontFamily="Montserrat_400Regular">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
