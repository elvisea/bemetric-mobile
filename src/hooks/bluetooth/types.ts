import { ReactNode } from "react";

import { Device, State, Subscription } from "react-native-ble-plx";

type BluetoothContextData = {
  devices: Device[];
  connectedDevice: Device | null;

  values: string[];

  bluetoothState: State;

  bluetoothEnabled: boolean;
  deviceIsConnected: boolean;

  permissionsGranted: boolean;

  removeValues(): void;

  removeDevices(): void;
  setDevices(devices: Device[]): void;

  monitorCharacteristic(
    onValueChange: (value: string) => void,
  ): Promise<Subscription | undefined>;

  connectToDevice(id: string): Promise<void>;
  monitorBluetoothState(state: State): void;

  resetState(): Promise<void>;
  resetBluetooth(): Promise<void>;

  isDeviceConnected(id: string): Promise<boolean>;

  requestPermissions(): Promise<boolean>;

  changeGrantedPermissions(granted: boolean): void;

  writeCharacteristic(command: object): Promise<void>;
};

type BluetoothProviderProps = {
  children: ReactNode;
};

type AuthState = {
  devices: Device[];
  connectedDevice: Device | null;

  bluetoothState: State;

  bluetoothEnabled: boolean;
  deviceIsConnected: boolean;
  permissionsGranted: boolean;

  values: string[];
};

type AuthAction =
  | { type: "SET_DEVICE"; payload: Device }
  | { type: "REMOVE_DEVICE" }
  | { type: "SET_DEVICES"; payload: Device[] }
  | { type: "REMOVE_DEVICES" }
  | { type: "CONNECT_DEVICE"; payload: boolean }
  | { type: "BLUETOOTH_STATE"; payload: State }
  | { type: "ENABLE_BLUETOOTH"; payload: boolean }
  | { type: "RESET_BLUETOOTH" }
  | { type: "RESET_STATE" }
  | { type: "SET_VALUES"; payload: string }
  | { type: "REMOVE_VALUES" }
  | { type: "PERMISSIONS_GRANTED"; payload: boolean };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
