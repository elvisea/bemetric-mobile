import React, { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, VStack, IconButton, HStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";

import Logo from "@assets/b2k.svg";
import { THEME } from "@theme/theme";

import { Icon } from "./styles";

type Props = {
  bg: ColorSchemeType;
  firstIcon: keyof typeof MaterialIcons.glyphMap;
  secondIcon?: keyof typeof MaterialIcons.glyphMap;
  thirdIcon?: keyof typeof MaterialIcons.glyphMap;
  children?: ReactNode;
  handleFirstIcon: () => void;
  handleSecondIcon?: () => void;
  handleThirdIcon?: () => void;
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "space-between" | "center" | "flex-start" | "flex-end";
};

export function LayoutDefault({
  bg,
  firstIcon,
  secondIcon,
  thirdIcon,
  children,
  alignItems = "center",
  justifyContent,
  handleFirstIcon,
  handleSecondIcon,
  handleThirdIcon,
}: Props) {
  return (
    <VStack
      w="full"
      bg={bg}
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <HStack
        w="full"
        h={`${RFValue(82)}px`}
        bg={THEME.colors.blue[700]}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <IconButton
          icon={<Icon name={firstIcon} />}
          onPress={handleFirstIcon}
        />

        {/* <Logo /> */}

        <Box flexDirection="row" alignItems="center" justifyContent="center">
          {secondIcon && (
            <IconButton
              icon={<Icon name={secondIcon} />}
              onPress={handleSecondIcon}
            />
          )}

          {thirdIcon && (
            <IconButton
              icon={<Icon name={thirdIcon} />}
              onPress={handleThirdIcon}
            />
          )}
        </Box>
      </HStack>

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
