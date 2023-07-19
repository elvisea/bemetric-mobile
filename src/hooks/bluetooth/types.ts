import { ReactNode } from "react";
import { BleError, Device, State, Subscription } from "react-native-ble-plx";

type BluetoothContextData = {
  devices: Device[];
  connectedDevice: Device | null;

  deviceResponse: object | null | undefined;

  bluetoothState: State;

  bluetoothEnabled: boolean;
  deviceIsConnected: boolean;

  permissionsGranted: boolean;

  setServiceUUID(serviceUUID: string): void;

  setCharacteristicUUID(characteristicUUID: string): void;

  setCommand(command: object): void;

  resetBluetooth(): void;

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

  serviceUUID: string;
  characteristicUUID: string;

  command: object;

  deviceResponse: object | null | undefined;

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
  | { type: "CONNECT_DEVICE"; payload: boolean }
  | { type: "BLUETOOTH_STATE"; payload: State }
  | { type: "ENABLE_BLUETOOTH"; payload: boolean }
  | { type: "SET_DEVICE_RESPONSE"; payload: object | undefined }
  | { type: "RESET_DEVICE_RESPONSE" }
  | { type: "SET_SERVICE_UUID"; payload: string }
  | { type: "RESET_SERVICE_UUID" }
  | { type: "SET_CHARACTERISTIC_UUID"; payload: string }
  | { type: "RESET_CHARACTERISTIC_UUID" }
  | { type: "SET_COMMAND"; payload: object }
  | { type: "RESET_BLUETOOTH" }
  | { type: "PERMISSIONS_GRANTED"; payload: boolean };

export { BluetoothContextData, BluetoothProviderProps, AuthState, AuthAction };
