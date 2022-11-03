import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(65)}px;
  border: ${RFValue(1)}px solid ${THEME.colors.blue[700]};
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(65)}px;
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_500Medium};
  margin-bottom: ${RFValue(2)}px;
  color: #363636;
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: #a4a4a4;
`;
