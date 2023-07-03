import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Device } from "react-native-ble-plx";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { LayoutDefault } from "@components/LayoutDefault";
import { DeviceBluetooth } from "@components/DeviceBluetooth";
import { IncludeHeader } from "@components/Include/IncludeHeader";

import { Content, TitleHeader, Warning, Status } from "./styles";

export function Bluetooth() {
  const navigation = useNavigation();

  const { devices, bluetoothEnabled, scanForDevices, requestPermissions } =
    useBluetooth();

  const [isAllowed, setIsAllowed] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const requestUsagePermissions = async () => {
    const response = await requestPermissions();
    setIsAllowed(response);
  };

  const handleChooseDevice = (device: Device) => {
    if (device.name) {
      navigation.navigate("Manual", { id: device.id, serial: device.name });
    }
  };

  const canDisplay = () => bluetoothEnabled && devices.length > 0;

  useEffect(() => {
    requestUsagePermissions();
    if (isAllowed && bluetoothEnabled) scanForDevices();
  }, [isAllowed]);

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <IncludeHeader title="Bluetooh" />

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
