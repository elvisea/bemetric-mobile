import { ReactNode } from "react";

import { Device, State } from "react-native-ble-plx";

type BluetoothContextData = {
  device: Device | null;
  setDevice(device: Device): void;
  removeDevice(): void;

  clearReceivedValues(): void;
  sendCommand(command: object, time?: number): Promise<void>;

  devices: Device[];
  resetState(): void;

  values: string[];
  response: { [key: string]: string };

  status: State;
  isEnabled: boolean;

  permissionsGranted: boolean;
  setPermissions(granted: boolean): void;

  connectToDevice(id: string): Promise<Device | null>;
  disconnectToDevice(): Promise<void>;
};

type BluetoothProviderProps = {
  children: ReactNode;
};

type AuthState = {
  device: Device | null;
  devices: Device[];
  values: string[];
  response: { [key: string]: string };
  status: State;
  isEnabled: boolean;
  permissionsGranted: boolean;
};

type AuthAction =
  | { type: "SET_DEVICE"; payload: Device }
  | { type: "REMOVE_DEVICE" }
  | { type: "SET_DEVICES"; payload: Device[] }
  | { type: "REMOVE_DEVICES" }
  | { type: "ADD_VALUE"; payload: string }
  | { type: "REMOVE_VALUES" }
  | { type: "SET_RESPONSE"; payload: { [key: string]: string } }
  | { type: "REMOVE_RESPONSE" }
  | { type: "SET_BLUETOOTH_STATUS"; payload: State }
  | { type: "SET_BLUETOOTH"; payload: boolean }
  | { type: "SET_PERMISSIONS"; payload: boolean }
  | { type: "CLEAR_RECEIVED_VALUES" }
  | { type: "RESET_STATE" };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
