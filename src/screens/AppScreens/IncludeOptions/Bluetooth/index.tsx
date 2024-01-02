import { useCallback, useState } from "react";
import { BackHandler, FlatList, StyleSheet } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { Device, State } from "react-native-ble-plx";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import BluetoothManager from "@manager/bluetooth";
import { requestPermissions } from "@manager/permissions";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";
import { DeviceBluetooth } from "@components/DeviceBluetooth";

import { initialState } from "./constants";
import { Content, TitleHeader, Warning, Status } from "./styles";

const bluetoothManager = BluetoothManager.getInstance();

export function Bluetooth() {
  const { removeValues } = useBluetooth();
  const { navigate, dispatch } = useNavigation();

  const [state, setState] = useState(initialState);

  const canDisplay = () => state.bluetoothEnabled && state.devices.length > 0;

  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    setState((oldState) => ({ ...oldState, permissionsGranted: isGranted }));
  };

  const handleChooseDevice = (device: Device) => {
    if (device.name) {
      navigate("VincularDispositivo", { serial: device.name, id: device.id });
    }
  };

  const monitorBluetoothState = (state: State) => {
    const isPoweredOn = state === State.PoweredOn;
    setState((oldState) => ({ ...oldState, bluetoothEnabled: isPoweredOn }));
  };

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();

      if (state.permissionsGranted && state.bluetoothEnabled) {
        bluetoothManager.scanForDevices((scannedDevices) => {
          setState((oldState) => ({ ...oldState, devices: scannedDevices }));
        });
      }

      return () => {
        bluetoothManager.stopScan();
      };
    }, [state.permissionsGranted, state.bluetoothEnabled]),
  );

  useFocusEffect(
    useCallback(() => {
      const stateChangeListener = bluetoothManager.monitorBluetoothState(
        (state) => {
          monitorBluetoothState(state);
        },
      );

      return () => {
        stateChangeListener.remove();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        removeValues();
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Bluetooth" />

      {!state.bluetoothEnabled && (
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
          data={state.devices}
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
