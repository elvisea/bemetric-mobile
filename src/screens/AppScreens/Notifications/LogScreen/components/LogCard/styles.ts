import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  margin-bottom: ${RFValue(8)}px;
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(6)}px;
  width: 100%;
  min-height: ${RFValue(100)}px;
  border: ${RFValue(1)}px solid #e6e6e6;
  background-color: ${THEME.colors.white};
`;

export const Header = styled.View`
  padding: ${RFValue(8)}px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: ${RFValue(1)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${THEME.colors.gray[200]};
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Date = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.gray[250]};
  margin-left: ${RFValue(10)}px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ContentWebView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;
