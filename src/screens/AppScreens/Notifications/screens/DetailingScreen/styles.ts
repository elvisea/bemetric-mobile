import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Text = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.gray[50]};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${RFValue(16)}px;
  height: ${RFValue(58)}px;
  background: ${THEME.colors.white};

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${THEME.colors.gray[100]};
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderSecondary = styled.View`
  width: 100%;
  background-color: ${THEME.colors.white};
  margin-bottom: ${RFValue(8)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${RFValue(36)}px;
  padding: 0 ${RFValue(16)}px;
`;

export const Value = styled.Text`
  color: ${THEME.colors.blue[700]};
  font-size: ${RFValue(16)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;
