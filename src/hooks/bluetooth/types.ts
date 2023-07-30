import { ReactNode } from "react";
import {
  BleError,
  Characteristic,
  Device,
  State,
  Subscription,
} from "react-native-ble-plx";

type BluetoothContextData = {
  devices: Device[];
  connectedDevice: Device | null;

  returnedValues: string[];

  bluetoothState: State;

  bluetoothEnabled: boolean;
  deviceIsConnected: boolean;

  permissionsGranted: boolean;

  resetReturnValues(): void;

  writeCharacteristicWithResponseForService(
    device: Device,
    command: object
  ): Promise<Characteristic | undefined>;

  resetTotal(): Promise<void>;
  resetBluetooth(): Promise<void>;

  isDeviceConnected(id: string): Promise<boolean>;
  checkConnectedDevices(): Promise<boolean>;

  scanForDevices(): void;

  requestPermissions(): Promise<boolean>;

  connectToDevice(id: string): Promise<void>;

  disconnectDevice(id: string): Promise<void>;

  changeGrantedPermissions(granted: boolean): void;

  writeCharacteristicWithResponseForDevice(
    serviceUUID: string,
    characteristicUUID: string,
    payload: object
  ): Promise<void>;

  monitorCharacteristicForDevice(
    device: Device,
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined>;
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

  returnedValues: string[];
};

type AuthAction =
  | { type: "SET_DEVICE"; payload: Device }
  | { type: "SET_DEVICE_LIST"; payload: Device[] }
  | { type: "REMOVE_DEVICE" }
  | { type: "REMOVE_DEVICES_LIST" }
  | { type: "CONNECT_DEVICE"; payload: boolean }
  | { type: "BLUETOOTH_STATE"; payload: State }
  | { type: "ENABLE_BLUETOOTH"; payload: boolean }
  | { type: "RESET_BLUETOOTH" }
  | { type: "RESET_TOTAL" }
  | { type: "INCLUDE_RETURN_Value"; payload: string }
  | { type: "RESET_RETURN_VALUES" }
  | { type: "PERMISSIONS_GRANTED"; payload: boolean };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
