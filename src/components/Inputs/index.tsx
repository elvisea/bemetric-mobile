import React, { createRef, useState, RefObject } from "react";

import { Container } from "./styles";

import { InputToken } from "@components/InputToken";
import { TextInput } from "react-native";

type InputsProps = {
  inputs?: number;
  onValueChanges?: (values: string[]) => void;
};

const Inputs: React.FC<InputsProps> = ({ inputs = 4, onValueChanges }) => {
  let inputRefs: RefObject<TextInput>[] = Array.from({ length: inputs }, () =>
    createRef<TextInput>(),
  );

  const [values, setValues] = useState<string[]>(Array(inputs).fill(""));

  const focusPreviousInput = (index: number) => {
    if (index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const focusNextInput = (index: number) => {
    if (index < inputs - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const onChangeText = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);

    text ? focusNextInput(index) : focusPreviousInput(index);
    onValueChanges && onValueChanges(newValues);
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && values[index] === "") {
      focusPreviousInput(index);
      if (index > 0) {
        const newValues = [...values];
        newValues[index - 1] = "";
        setValues(newValues);
        onValueChanges && onValueChanges(newValues);
      }
    }
  };

  return (
    <Container>
      {inputRefs.map((ref, index) => (
        <InputToken
          key={index}
          ref={ref}
          value={values[index]}
          onKeyPress={({ nativeEvent: { key } }) => onKeyPress(key, index)}
          onChangeText={(text) => onChangeText(text, index)}
        />
      ))}
    </Container>
  );
};

export { Inputs };
