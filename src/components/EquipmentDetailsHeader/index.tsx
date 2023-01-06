import React, { ReactNode } from "react";
import { HStack, Text, IStackProps } from "native-base";

import { THEME } from "@theme/theme";

type Props = IStackProps & {
  title: string;
  children?: ReactNode;
};

export function EquipmentDetailsHeader({ title, children, ...rest }: Props) {
  return (
    <HStack
      w="full"
      h={58}
      bg={THEME.colors.white}
      paddingX="16px"
      alignItems="center"
      justifyContent={children ? "space-between" : "flex-start"}
      {...rest}
    >
      <Text
        color="blue.700"
        fontSize="16px"
        fontFamily="Roboto_400Regular"
        isTruncated
      >
        {title}
      </Text>
      {children}
    </HStack>
  );
}
