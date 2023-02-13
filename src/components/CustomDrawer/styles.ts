import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #0069c0;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: ${RFValue(60)}px;
`;
