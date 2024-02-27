import React from "react";
import WebView from "react-native-webview";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import {
  Container,
  Header,
  ContentHeader,
  Date,
  ButtonSearch,
  ContentWebView,
} from "./styles";

interface ILogCardProps {
  icon: "bell" | "flag";
  html: string;
  date: string;
  search: () => void;
}

type Icon = {
  [index: string]: React.ReactNode;
};

const icons: Icon = {
  bell: (
    <MaterialCommunityIcons
      name="bell-ring"
      color={THEME.colors.yellow[100]}
      size={20}
    />
  ),
  flag: <Ionicons name="flag" size={20} color={THEME.colors.blue[700]} />,
};

function LogCard({ icon, html, date, search }: ILogCardProps) {
  return (
    <Container>
      <Header>
        <ContentHeader>
          {icons[icon]}
          <Date>{date}</Date>
        </ContentHeader>

        <ButtonSearch onPress={search}>
          <Entypo
            size={20}
            name="magnifying-glass"
            color={THEME.colors.blue[700]}
          />
        </ButtonSearch>
      </Header>

      <ContentWebView>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          scalesPageToFit={false}
          showsVerticalScrollIndicator={false}
          source={{ html: html }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView error: ", nativeEvent);
          }}
        />
      </ContentWebView>
    </Container>
  );
}

export { LogCard };
