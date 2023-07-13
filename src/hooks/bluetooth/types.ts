import { ReactNode } from "react";
import { BleError, Device, State, Subscription } from "react-native-ble-plx";

type BluetoothContextData = {
  devices: Device[];
  connectedDevice: Device | null;

  bluetoothState: State;

  bluetoothEnabled: boolean;
  deviceIsConnected: boolean;

  permissionsGranted: boolean;

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
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined>;

  connectAndMonitorCharacteristicForDevice(
    id: string,
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
};

type AuthAction =
  | { type: "SET_DEVICE"; payload: Device }
  | { type: "SET_DEVICE_LIST"; payload: Device[] }
  | { type: "REMOVE_DEVICE" }
  | { type: "REMOVE_DEVICES_LIST" }
  | { type: "CONNECT_DEVICE" }
  | { type: "BLUETOOTH_STATE"; payload: State }
  | { type: "ENABLE_BLUETOOTH"; payload: boolean }
  | { type: "PERMISSIONS_GRANTED"; payload: boolean };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
