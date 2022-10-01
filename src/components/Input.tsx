import React from 'react';
import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      color="white"
      fontSize="sm"
      fontFamily="Montserrat_400Regular"
      placeholderTextColor="white"
      borderTopWidth={0}
      borderBottomWidth={1}
      borderLeftWidth={0}
      borderRightWidth={0}
      _focus={{
        bg: 'transparent',
        borderColor: 'white',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      }}
      {...rest}
    />
  );
}
