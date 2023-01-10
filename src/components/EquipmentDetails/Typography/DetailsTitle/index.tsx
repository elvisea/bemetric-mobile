import React from "react";
import { ITextProps, Text } from "native-base";

type Props = ITextProps & {
  title: string;
};

export function DetailsTitle({ title, ...rest }: Props) {
  return (
    <Text
      color="blue.700"
      fontSize="14px"
      fontFamily="Roboto_400Regular"
      {...rest}
    >
      {title}
    </Text>
  );
}
