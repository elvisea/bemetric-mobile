import React from "react";
import { HStack, Text, IStackProps } from "native-base";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

type Props = IStackProps & {
  mt?: number;
  date: string;
  title: string;
};

export function Registry({ mt = 0, date, title, ...rest }: Props) {
  return (
    <HStack
      w="full"
      h={RFValue(35)}
      mt={mt}
      bg={THEME.colors.white}
      paddingX="16px"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Text
        color="#878787"
        fontSize="13px"
        fontFamily="Montserrat_300Light"
        isTruncated
      >
        {title}
      </Text>

      <Text
        color="#878787"
        fontSize="13px"
        fontFamily="Montserrat_300Light"
        isTruncated
      >
        {date}
      </Text>
    </HStack>
  );
}
