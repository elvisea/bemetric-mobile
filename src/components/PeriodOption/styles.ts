import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

interface IStyleProps {
  isActive: boolean;
}

const { colors } = THEME;

export const Container = styled.TouchableOpacity<IStyleProps>`
  width: 100%;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(4)}px;
  border: 1px solid
    ${({ isActive }) => (isActive ? colors.blue[700] : "#E6E6E6")};
  background: #fff;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(4)}px;
`;
