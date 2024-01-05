import { ReactNode } from "react";

import { Device } from "react-native-ble-plx";

type BluetoothContextData = {
  device: Device | null;
  setDevice(device: Device): void;
  removeDevice(): void;
};

type BluetoothProviderProps = {
  children: ReactNode;
};

type AuthState = {
  device: Device | null;
};

type AuthAction =
  | { type: "SET_DEVICE"; payload: Device }
  | { type: "REMOVE_DEVICE" };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
