import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

import styled, { css } from "styled-components/native";

type Container = {
  background: string;
};

export const Container = styled.TouchableOpacity<Container>`
  ${({ background }) => css`
    width: 100%;
    height: ${RFValue(54)}px;
    background: ${background};

    padding: 0 ${RFValue(8)}px;
    border-radius: ${RFValue(28)}px;

    margin-bottom: ${RFValue(12)}px;

    flex-direction: row;
    gap: ${RFValue(12)}px;

    align-items: center;
    justify-content: flex-start;
  `}
`;

type Title = {
  color: string;
};

export const Title = styled.Text<Title>`
  ${({ color }) => css`
    margin-left: ${RFValue(8)}px;
    color: ${color};
    font-family: ${THEME.fonts.Roboto_500Medium};
  `}
`;
