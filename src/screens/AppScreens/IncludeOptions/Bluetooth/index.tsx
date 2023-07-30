import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Device } from "react-native-ble-plx";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";
import { DeviceBluetooth } from "@components/DeviceBluetooth";

import { Content, TitleHeader, Warning, Status } from "./styles";

export function Bluetooth() {
  const { navigate, dispatch } = useNavigation();

  const {
    devices,
    bluetoothEnabled,
    permissionsGranted,
    scanForDevices,
    requestPermissions,
    changeGrantedPermissions,
  } = useBluetooth();

  const canDisplay = () => bluetoothEnabled && devices.length > 0;

  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    changeGrantedPermissions(isGranted);
  };

  const handleChooseDevice = (device: Device) => {
    if (device.name) {
      navigate("VincularDispositivo", { serial: device.name });
    }
  };

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();

      if (permissionsGranted && bluetoothEnabled) {
        scanForDevices();
      }
    }, [permissionsGranted, bluetoothEnabled])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Bluetooth" />

      {!bluetoothEnabled && (
        <Content>
          <Warning>
            Ative o Bluetooth nas configurações do seu celular. Após ativar o
            Bluetooth a lista de dispositivos estará aqui.
          </Warning>

          <MaterialIcons
            name="bluetooth-disabled"
            size={60}
            color={THEME.colors.blue[700]}
          />

          <Status>Status: Não pareado</Status>
        </Content>
      )}

      {canDisplay() && (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <TitleHeader>Selecione um dispositivo</TitleHeader>
          }
          style={styles.container}
          renderItem={({ item: device }) => (
            <DeviceBluetooth
              id={device.id}
              name={device.name}
              onPress={() => handleChooseDevice(device)}
            />
          )}
        />
      )}
    </LayoutDefault>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
});
