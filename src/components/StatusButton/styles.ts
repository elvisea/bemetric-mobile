import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

type TypeContainer = {
  mt: number;
  mb: number;
  width: string;
};

export const Container = styled.TouchableOpacity<TypeContainer>`
  width: ${({ width }) => `${width}%`};
  height: ${RFValue(68)}px;
  background: ${THEME.colors.white};
  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(4)}px;

  border-width: ${RFValue(1)}px;
  border-color: ${THEME.colors.blue[700]};
`;

export const Content = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(4)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.blue[700]};
`;

export const Value = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.gray[450]};
  margin-left: ${RFValue(8)}px;
`;
