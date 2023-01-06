import React from "react";
import { ITextProps, Text } from "native-base";

type Props = ITextProps & {
  title: string;
};

export function EquipmentDetailsDescription({ title, ...rest }: Props) {
  return (
    <Text
      color="black"
      fontSize="13px"
      fontFamily="Montserrat_300Light"
      {...rest}
    >
      {title}
    </Text>
  );
}
