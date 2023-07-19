import "react-native-gesture-handler";

import React from "react";

import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import {
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
} from "@expo-google-fonts/roboto-slab";

import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";

import { AuthProvider } from "./src/hooks/authentication";
import { BluetoothProvider } from "./src/hooks/bluetooth";
import { CustomerProvider } from "./src/hooks/customer";

import { THEME } from "./src/theme/theme";
import { Routes } from "./src/routes";

import { Loading } from "./src/components/Loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_400Regular,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <BluetoothProvider>
            <CustomerProvider>
              {fontsLoaded ? <Routes /> : <Loading />}
            </CustomerProvider>
          </BluetoothProvider>
        </AuthProvider>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
