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
        color="white"
        py={2}
        px={0}
        fontSize="sm"
        fontFamily="Montserrat_400Regular"
        placeholderTextColor="white"
        borderTopWidth={0}
        borderBottomWidth={1}
        borderLeftWidth={0}
        borderRightWidth={0}
        isInvalid={invalid}

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
