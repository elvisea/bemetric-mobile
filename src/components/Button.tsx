import React from 'react';
import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="blue.700"
      borderColor="white"
      borderWidth={1}
      borderRadius={6}
      {...rest}
    >
      <Heading color="white" fontSize={16} fontFamily="Montserrat_600SemiBold">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
