import React, { ReactNode } from "react";
import { HStack, Text, IStackProps } from "native-base";

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
      h={58}
      bg={THEME.colors.white}
      paddingX="16px"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <HStack h="full" alignItems="center">
        {icon && icon}

        <Text
          color={color}
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          marginLeft={icon ? "16px" : "0"}
          isTruncated
        >
          {title}
        </Text>
      </HStack>

      {children}
    </HStack>
  );
}
