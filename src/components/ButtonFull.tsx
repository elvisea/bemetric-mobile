import React from 'react';
import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function ButtonFull({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={77}
      bg="blue.600"
      borderWidth={0}
      borderRadius={6}
      {...rest}
    >
      <Heading
        color="white"
        fontSize={16}
        fontFamily="Montserrat_300Light"
      >
        {title}
      </Heading>
    </NativeBaseButton>
  );
}