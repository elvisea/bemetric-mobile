import React, { forwardRef } from "react";

import { Container } from "./styles";
import { TextInput, TextInputProps } from "react-native";

interface OTPInputProps extends TextInputProps {}

const OTPInput = forwardRef<TextInput, OTPInputProps>((props, ref) => (
  <Container
    ref={ref}
    maxLength={1}
    keyboardType="numeric"
    contextMenuHidden={true}
    {...props}
  />
));

export { OTPInput };
