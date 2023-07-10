import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

interface IStyleProps {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<IStyleProps>`
  width: 100%;
  height: ${RFValue(90)}px;

  align-items: center;
  justify-content: flex-start;

  padding: 0 ${RFValue(16)}px;

  border: ${({ isSelected }) =>
    isSelected
      ? `${RFValue(2)}px solid ${THEME.colors.blue[700]}`
      : `${RFValue(1)}px solid #e6e6e6`};

  border-radius: ${RFValue(4)}px;

  background: ${THEME.colors.white};

  flex-direction: row;

  margin-bottom: ${RFValue(8)}px;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  color: #363636;
  font-size: ${RFValue(15)}px;
  font-family: ${THEME.fonts.Roboto_500Medium};
`;

export const Info = styled.Text`
  color: #a4a4a4;
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;
