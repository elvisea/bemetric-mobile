import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Circle = styled.View`
  width: ${RFValue(16)}px;
  height: ${RFValue(16)}px;
  border-radius: ${RFValue(8)}px;
  position: absolute;
  margin-bottom: ${RFValue(16)}px;
  background: #ffbb00;
`;

export const ContainerIcon = styled.View`
  flex-direction: row;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
`;

export const BadgeCustom = styled.View`
  z-index: 1;
  position: absolute;
  top: ${RFValue(1)}px;
  right: ${RFValue(1)}px;
  min-width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;
  border-radius: ${RFValue(9)}px;
  align-items: center;
  justify-content: center;
  background: #ffc401;
`;

export const ImageLogo = styled.Image`
  width: ${RFValue(57)}px;
  height: ${RFValue(20)}px;
  margin-left: ${RFValue(-20)}px;
`;

export const Icon = styled(MaterialIcons).attrs(() => ({
  size: 26,
  color: THEME.colors.white,
}))``;
