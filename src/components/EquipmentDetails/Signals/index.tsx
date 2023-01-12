import React, { ReactNode } from "react";
import { Text, IPressableProps, Pressable, VStack } from "native-base";

import { THEME } from "@theme/theme";

type Props = IPressableProps & {
  mt?: string;
  ml?: string;
  icon: ReactNode;
  title: string;
  value?: string;
};

export function Signals({
  mt = "0",
  ml = "0",
  icon,
  title,
  value,
  ...rest
}: Props) {
  return (
    <Pressable
      w="156px"
      h="64px"
      mt={mt}
      ml={ml}
      bg={THEME.colors.white}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      <Text
        color="#878787"
        fontSize="12px"
        mb="8px"
        fontFamily="Montserrat_300Light"
        isTruncated
      >
        {title}
      </Text>

      <VStack flexDir="row">
        {icon}
        {value && (
          <Text
            color="#878787"
            fontSize="13px"
            ml="8px"
            fontFamily="Montserrat_300Light"
            isTruncated
          >
            {value}
          </Text>
        )}
      </VStack>
    </Pressable>
  );
}
