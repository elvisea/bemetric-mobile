import React, { ReactNode } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Box, VStack, IconButton, HStack, Text } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";

import { THEME } from "@theme/theme";

import { BadgeCustom, Icon, ImageLogo } from "./styles";

type Count = { events: number; messages: number };

type Props = {
  bg: ColorSchemeType;
  firstIcon: keyof typeof MaterialIcons.glyphMap;
  secondIcon?: keyof typeof MaterialIcons.glyphMap;
  thirdIcon?: keyof typeof MaterialIcons.glyphMap;

  count?: Count;
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
  count,
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

        <ImageLogo source={require("@assets/b2k.png")} />

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mr={count?.messages !== 0 ? 3 : 0}
        >
          {secondIcon && (
            <Box>
              {count?.events !== 0 && (
                <BadgeCustom>
                  <Text textAlign="center" fontSize={12} color="white">
                    {count?.events}
                  </Text>
                </BadgeCustom>
              )}
              <IconButton
                icon={<Icon name={secondIcon} />}
                onPress={handleSecondIcon}
              />
            </Box>
          )}

          {thirdIcon && (
            <VStack>
              {count?.messages !== 0 && (
                <BadgeCustom>
                  <Text textAlign="center" fontSize={12} color="white">
                    {count?.messages}
                  </Text>
                </BadgeCustom>
              )}

              <IconButton
                icon={<Icon name={thirdIcon} />}
                onPress={handleThirdIcon}
              />
            </VStack>
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
