import React, { forwardRef } from "react";

import { Container } from "./styles";
import { TextInput, TextInputProps } from "react-native";

interface InputTokenProps extends TextInputProps {}

const InputToken = forwardRef<TextInput, InputTokenProps>((props, ref) => (
  <Container
    ref={ref}
    maxLength={1}
    keyboardType="numeric"
    contextMenuHidden={true}
    {...props}
  />
));

export { InputToken };
