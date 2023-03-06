import React, { ReactNode } from "react";
import { Box, IBoxProps } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

interface Props extends IBoxProps {
  bg?: string;
  icon: ReactNode;
}

export const IconMenuDrawer = ({
  bg = THEME.colors.blue[700],
  icon,
  ...rest
}: Props) => (
  <Box
    bg={bg}
    h={`${RFValue(34)}px`}
    w={`${RFValue(34)}px`}
    alignItems="center"
    justifyContent="center"
    borderRadius={`${RFValue(17)}px`}
    {...rest}
  >
    {icon}
  </Box>
);
