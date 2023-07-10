import { useEffect, useState } from "react";
import { Text, StyleSheet, Button } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import {
  BarCodeScanner,
  BarCodeScannerResult,
} from "expo-barcode-scanner";

import { THEME } from "@theme/theme";
import { LayoutDefault } from "@components/LayoutDefault";

export function QRCode() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);

    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </LayoutDefault>
  );
}
