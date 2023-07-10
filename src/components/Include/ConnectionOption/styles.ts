import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { THEME } from "@theme/theme";

interface IStyle {
  mt: number;
}

export const Container = styled.TouchableOpacity<IStyle>`
  width: 100%;
  height: ${RFValue(68)}px;
  padding: 0 ${RFValue(16)}px;
  margin-top: ${({ mt }) => RFValue(mt)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${THEME.colors.white};
`;
