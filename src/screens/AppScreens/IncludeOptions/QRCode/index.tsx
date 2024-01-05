import { useCallback, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

import { THEME } from "@theme/theme";
import { requestPermissions } from "@manager/permissions";

import { initialState } from "./constants";

import { LayoutDefault } from "@components/LayoutDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

export function QRCode() {
  const { navigate, dispatch } = useNavigation();
  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const [state, setState] = useState(initialState);

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    setState((previousState) => ({
      ...previousState,
      permissionsGranted: isGranted,
    }));
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setState((previousState) => ({
      ...previousState,
      hasPermission: status === "granted",
    }));
  };

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    setState((previousState) => ({ ...previousState, scanned: true }));

    const [serial, chave] = data.split(":");

    Alert.alert(
      "Leitura realizada com sucesso.",
      "Verificar disponibilidade do dispositivo.",
      [
        {
          text: "Verificar",
          onPress: () => navigate("VincularDispositivo", { serial, chave }),
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      !state.permissionsGranted && requestUsagePermissions();
      state.permissionsGranted && getBarCodeScannerPermissions();
    }, [state.permissionsGranted]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setState(initialState);
      };
    }, []),
  );

  if (state.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      {state.hasPermission === null && (
        <LoadingSpinner color={THEME.colors.blue[700]} />
      )}

      {state.hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={state.scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </LayoutDefault>
  );
}
