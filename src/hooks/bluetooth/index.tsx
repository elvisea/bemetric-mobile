import React, { createContext, useContext, useReducer } from "react";

import { Device, BleError } from "react-native-ble-plx";

import { Alert } from "react-native";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { BluetoothContextData, BluetoothProviderProps } from "./types";

import BluetoothManager from "@manager/bluetooth";

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData,
);

const bluetoothManager = BluetoothManager.getInstance();

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const connectToDevice = async (id: string) => {
    try {
      const device = await bluetoothManager.connectToDevice(id);

      if (device instanceof Device) {
        dispatch({ type: "SET_DEVICE", payload: device });
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

  return (
    <BluetoothContext.Provider
      value={{
        connectToDevice,
        device: state.device,
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
