import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  height: ${RFValue(102)}px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  background: #fff;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(8)}px;
`;
