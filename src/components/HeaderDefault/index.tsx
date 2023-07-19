import React, { ReactNode } from "react";
import { HStack, Text, IStackProps } from "native-base";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

type Props = IStackProps & {
  title: string;
  children?: ReactNode;
};

export function HeaderDefault({ title, children, ...rest }: Props) {
  return (
    <HStack
      w="full"
      h={`${RFValue(58)}px`}
      bg={THEME.colors.white}
      paddingX="16px"
      alignItems="center"
      justifyContent={children ? "space-between" : "flex-start"}
      {...rest}
    >
      <Text
        color="blue.700"
        fontSize="16px"
        fontFamily="Roboto_500Medium"
        isTruncated
      >
        {title}
      </Text>
      {children}
    </HStack>
  );
}
