import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  picked: boolean;
}

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  height: ${RFValue(27)}px;
  margin-right: ${RFValue(24)}px;
`;

export const OutsideCircle = styled.View<Props>`
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;
  margin-right: ${RFValue(10)}px;
  border-color: ${({ picked }) => (picked ? "#FFF" : "#FFF")};
  border-width: 1px;
  border-style: solid;
  align-items: center;
  justify-content: center;
`;

export const InsideCircle = styled.View<Props>`
  height: ${RFValue(10)}px;
  width: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${({ picked }) => (picked ? "#FFF" : "#FFF")};
`;
