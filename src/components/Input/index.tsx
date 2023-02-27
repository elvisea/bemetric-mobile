import React from "react";

import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  mt?: number;
  mb?: number;
  errorMessage?: string | null;
};

export function Input({
  mt = 0,
  mb = 0,
  isInvalid,
  errorMessage = null,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mt={mt} mb={mb}>
      <NativeBaseInput
        px={0}
        color="white"
        fontSize={16}
        letterSpacing={1}
        fontFamily="Roboto_400Regular"
        placeholderTextColor="white"
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        borderBottomWidth={1}
        _input={{ cursorColor: "#FFF" }}
        _focus={{
          bg: "transparent",
          borderColor: "white",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        isInvalid={invalid}
        {...rest}
      />
      <FormControl.ErrorMessage
        _text={{ color: "red.500", fontFamily: "Roboto_700Bold" }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
