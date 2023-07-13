import { useEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { LayoutDefault } from "@components/LayoutDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

export function QRCode() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    devices,
    bluetoothEnabled,
    permissionsGranted,

    scanForDevices,
    requestPermissions,
    changeGrantedPermissions,
  } = useBluetooth();

  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    changeGrantedPermissions(isGranted);
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const checkAvailability = (data: string) => {
    const chave = data.split(":")[1];
    const serial = data.split(":")[0];

    const scannedDevice = devices.find((device) => device.name === serial);

    if (scannedDevice) {
      setScanned(false);
      navigation.navigate("Manual", { id: scannedDevice.id, chave, serial });
    }
  };

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    setScanned(true);

    Alert.alert(
      "Leitura realizada com sucesso.",
      "Verificar disponibilidade do dispositivo.",
      [
        {
          text: "Verificar",
          onPress: () => checkAvailability(data),
        },
      ]
    );
  };

  useEffect(() => {
    !permissionsGranted && requestUsagePermissions();
    permissionsGranted && getBarCodeScannerPermissions();
  }, [permissionsGranted]);

  useEffect(() => {
    if (permissionsGranted && bluetoothEnabled) scanForDevices();
  }, [permissionsGranted, bluetoothEnabled]);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      {hasPermission === null && (
        <LoadingSpinner color={THEME.colors.blue[700]} />
      )}

      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </LayoutDefault>
  );
}
