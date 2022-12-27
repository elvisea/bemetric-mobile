import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

import { THEME } from "@theme/theme";

export const ButtonOption = styled(RectButton)`
  width: 20%;
  height: ${RFValue(50)}px;
  justify-content: center;
  align-items: center;
`;

export const HeaderOption = styled.View`
  width: 20%;
  height: ${RFValue(50)}px;
  justify-content: center;
  align-items: center;
`;

export const TitleOption = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${THEME.colors.blue[700]};
  font-family: ${THEME.fonts.Montserrat_600SemiBold};
`;
