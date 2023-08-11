import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";

export const HTMLrender = styled(WebView)`
  font-size: ${RFValue(15)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;

export const Date = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.gray[250]};
  margin-left: ${RFValue(10)}px;
`;

export const ViewBox = styled.View`
  margin-top: ${RFValue(6)}px;
  padding: ${RFValue(6)}px ${RFValue(12)}px;
  border-radius: ${RFValue(6)}px;
  min-width: 80%;
  min-height: ${RFValue(130)}px;
  border: ${RFValue(1)}px solid #e6e6e6;
  background-color: ${THEME.colors.white};
`;

export const FlexView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${RFValue(1)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${THEME.colors.gray[200]};
  padding: ${RFValue(8)}px;
`;

export const StackView = styled.View`
  flex-direction: row;
  align-items: center;
`;
