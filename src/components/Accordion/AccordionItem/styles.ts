import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(65)}px;
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  height: ${RFValue(65)}px;
  margin-top: ${RFValue(8)}px;
  border-top-color: #e6e6e6;
  border-right-color: #e6e6e6;
  border-bottom-color: #e6e6e6;
  border-left-color: ${THEME.colors.blue[700]};
  border-top-width: ${RFValue(1)}px;
  border-right-width: ${RFValue(1)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-left-width: ${RFValue(4)}px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: #a4a4a4;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_500Medium};
  margin-bottom: ${RFValue(2)}px;
  color: #363636;
`;
