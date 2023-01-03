import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { MessageList } from "@screens/AppScreens/Messages/MessageList";
import { MessageDetails } from "@screens/AppScreens/Messages/MessageDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export default function MessagesStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="MessageList"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="MessageList" component={MessageList} />
        <Screen name="MessageDetails" component={MessageDetails} />
      </Navigator>
    </>
  );
}
