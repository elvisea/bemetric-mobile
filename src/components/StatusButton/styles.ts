import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

type TypeContainer = {
  mt: number;
  mb: number;
};

export const Container = styled.TouchableOpacity<TypeContainer>`
  flex-direction: row;
  width: 100%;
  height: ${RFValue(58)}px;
  background: ${THEME.colors.white};
  padding: 0 ${RFValue(16)}px;
  align-items: center;
  justify-content: space-between;

  margin-top: ${({ mt }) => `${RFValue(mt)}px`};
  margin-bottom: ${({ mb }) => `${RFValue(mb)}px`};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: #878787;
`;

export const Value = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.blue[700]};
`;
