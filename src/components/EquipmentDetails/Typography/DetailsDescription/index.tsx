import React from "react";
import { ITextProps, Text } from "native-base";

type Props = ITextProps & {
  title: string;
};

export function DetailsDescription({ title, ...rest }: Props) {
  return (
    <Text
      color="black"
      fontSize="12px"
      fontFamily="Roboto_400Regular"
      {...rest}
    >
      {title}
    </Text>
  );
}
