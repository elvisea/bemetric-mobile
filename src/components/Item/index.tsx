import React, { ReactNode } from "react";
import { HStack, Text, IStackProps } from "native-base";

import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

type Props = IStackProps & {
  title: string;
  color?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export function Item({
  title,
  color = "#878787",
  icon,
  children,
  ...rest
}: Props) {
  return (
    <HStack
      w="full"
      h={`${RFValue(58)}px`}
      bg={THEME.colors.white}
      paddingX={`${RFValue(16)}px`}
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <HStack h="full" alignItems="center">
        {icon && icon}

        <Text
          color={color}
          fontSize={`${RFValue(14)}px`}
          fontFamily="Roboto_400Regular"
          marginLeft={icon ? `${RFValue(16)}px` : "0"}
          isTruncated
        >
          {title}
        </Text>
      </HStack>

      {children}
    </HStack>
  );
}
