import React, { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import { Box, VStack, IconButton } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";

import { Icon } from "./styles";
import { THEME } from "@theme/theme";

type Props = {
  bg: ColorSchemeType;
  icon: keyof typeof Feather.glyphMap;
  children?: ReactNode;
  functionIcon: () => void;
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "space-between" | "center" | "flex-start" | "flex-end";
};

export function LayoutDefault({
  bg,
  icon,
  children,
  alignItems = "center",
  justifyContent,
  functionIcon,
}: Props) {
  return (
    <VStack
      w="full"
      bg={bg}
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        w="full"
        h={RFValue(82)}
        bg={THEME.colors.blue[700]}
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-start"
      >
        <IconButton icon={<Icon name={icon} />} onPress={functionIcon} />
      </Box>

      <Box
        w="full"
        flex={1}
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        {children}
      </Box>
    </VStack>
  );
}
