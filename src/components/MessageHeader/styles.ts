import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const ImageLogo = styled.Image`
  width: ${RFValue(57)}px;
  height: ${RFValue(20)}px;
  margin-left: ${RFValue(-20)}px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcons).attrs(() => ({
  size: 24,
  color: THEME.colors.white,
}))``;
