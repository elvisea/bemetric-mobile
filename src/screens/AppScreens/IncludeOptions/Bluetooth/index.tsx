import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { Device } from "react-native-ble-plx";

import { THEME } from "@theme/theme";

import { useBluetooth } from "@hooks/bluetooth";

import { requestPermissions } from "@manager/permissions";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { DeviceBluetooth } from "@components/DeviceBluetooth";

import { Content, TitleHeader, Warning, Status } from "./styles";

export function Bluetooth() {
  const context = useBluetooth();
  const { navigate, dispatch } = useNavigation();

  const canDisplay = () => context.isEnabled && context.devices.length > 0;

  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    context.setPermissions(isGranted);
  };

  const handleChooseDevice = (device: Device) => {
    if (device.name) {
      navigate("VincularDispositivo", { serial: device.name, id: device.id });
    }
  };

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();
    }, []),
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      {context.devices.length > 0 && <HeaderDefault title="Bluetooth" />}

      {context.devices.length === 0 && context.isEnabled && (
        <LoadingSpinner color={THEME.colors.blue[700]} />
      )}

      {!context.isEnabled && (
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
          data={context.devices}
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
