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

export function InputToken({
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
        fontSize="sm"
        textAlign="center"
        fontFamily="Montserrat_400Regular"
        placeholderTextColor="white"
        maxLength={1}
        _focus={{
          bg: "transparent",
          borderColor: "white",
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
