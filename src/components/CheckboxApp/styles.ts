import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.75,
}))`
  width: 100%;
  height: ${RFValue(50)}px;

  border-color: #e6e6e6;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;

  flex-direction: row;
  align-items: center;
`;
