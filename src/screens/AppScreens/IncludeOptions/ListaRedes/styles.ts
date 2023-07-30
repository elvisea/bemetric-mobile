import styled from "styled-components/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Network = styled.TouchableOpacity`
  height: ${RFValue(60)}px;
  width: 100%;
  padding: 0 ${RFValue(16)}px;

  margin-bottom: ${RFValue(8)}px;

  border: ${RFValue(1)}px solid #eeeeee;
  border-radius: ${RFValue(6)}px;
  background: #fff;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleNetwork = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.blue[700]};
`;

export const TitleList = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.blue[700]};
  margin-bottom: ${RFValue(8)}px;
`;

export const Icon = styled(FontAwesome5).attrs(() => ({
  name: "wifi",
  size: 26,
  color: THEME.colors.blue[700],
}))``;
