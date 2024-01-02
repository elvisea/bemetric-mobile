import React, { createContext, useContext, useEffect, useReducer } from "react";

import { State, Device, BleError } from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";
import { Alert, PermissionsAndroid, Platform } from "react-native";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { BluetoothContextData, BluetoothProviderProps } from "./types";

import BluetoothManager from "@manager/bluetooth";

import {
  SERVICE_UUID,
  CHARACTERISTIC_UUID,
  MONITORED_FEATURE_UUID,
} from "@hooks/uuid";

import { removeBytes } from "@utils/removebytes";
import { removeDuplicateDevices } from "@utils/bluetooth";

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData,
);

const bluetoothManager = BluetoothManager.getInstance();

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("State Context:", state);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      },
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      },
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      },
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const changeGrantedPermissions = (granted: boolean) => {
    dispatch({ type: "PERMISSIONS_GRANTED", payload: granted });
  };

  const isDeviceConnected = async (id: string) => {
    return await bluetoothManager.isDeviceConnected(id);
  };

  const resetState = async () => {
    dispatch({ type: "RESET_STATE" });
  };

  const resetBluetooth = async () => {
    dispatch({ type: "RESET_BLUETOOTH" });
  };

  const setDevices = (devices: Device[]) => {
    const allDevices = [...state.devices, ...devices];
    const devicesRemoved = removeDuplicateDevices(allDevices);

    dispatch({ type: "SET_DEVICES", payload: devicesRemoved });
  };

  const removeDevices = () => {
    dispatch({ type: "REMOVE_DEVICES" });
  };

  const removeValues = () => {
    dispatch({ type: "REMOVE_VALUES" });
  };

  const writeCharacteristic = async (command: object): Promise<void> => {
    await bluetoothManager.writeCharacteristic(
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      command,
    );
  };

  const monitorBluetoothState = (state: State) => {
    const isPoweredOn = state === State.PoweredOn;

    dispatch({ type: "BLUETOOTH_STATE", payload: state });
    dispatch({ type: "ENABLE_BLUETOOTH", payload: isPoweredOn });
  };

  const connectToDevice = async (id: string) => {
    try {
      const device = await bluetoothManager.connectToDevice(id);

      if (device instanceof Device) {
        dispatch({ type: "SET_DEVICE", payload: device });
        dispatch({ type: "CONNECT_DEVICE", payload: true });
      }

      if (device instanceof BleError) {
        Alert.alert(device.message, device.message);
      }

      if (!device) {
        Alert.alert(
          "Failed to connect to device",
          "Failed to connect to device",
        );
      }
    } catch (error) {
      Alert.alert("Failed to connect to device", "Failed to connect to device");
    }
  };

  const onValueChange = (value: string) => {
    dispatch({ type: "SET_VALUES", payload: removeBytes(value) });
  };

  useEffect(() => {
    const startMonitoring = async () => {
      if (state.connectedDevice) {
        const subscription = await bluetoothManager.monitorCharacteristic(
          SERVICE_UUID,
          MONITORED_FEATURE_UUID,
          onValueChange,
        );

        return () => {
          subscription?.remove();
        };
      }
    };

    startMonitoring();
  }, [state.connectedDevice]);

  useEffect(() => {
    const stateChangeListener = bluetoothManager.monitorBluetoothState(
      (state) => {
        console.log("Current Bluetooth Status:", state);
        monitorBluetoothState(state);
      },
    );

    return () => {
      if (stateChangeListener) {
        stateChangeListener.remove();
      }
    };
  }, []);

  return (
    <BluetoothContext.Provider
      value={{
        devices: state.devices,
        connectedDevice: state.connectedDevice,

        bluetoothState: state.bluetoothState,
        bluetoothEnabled: state.bluetoothEnabled,

        deviceIsConnected: state.deviceIsConnected,
        permissionsGranted: state.permissionsGranted,

        values: state.values,

        removeValues,

        resetState,
        resetBluetooth,

        isDeviceConnected,

        requestPermissions,
        changeGrantedPermissions,

        writeCharacteristic,
        monitorBluetoothState,
        connectToDevice,
        setDevices,
        removeDevices,

      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

function useBluetooth() {
  const context = useContext(BluetoothContext);
  return context;
}

export { BluetoothProvider, useBluetooth };
