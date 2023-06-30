import { Device, State } from "react-native-ble-plx";

interface IBluetoothManager {
  checkBluetoothEnabled: () => Promise<State>;
  connectedDevice: Device | null;
  allDevices: Device[];
  subscription: (deviceId: Device) => Promise<void>;
  connectToDevice: (deviceId: Device) => Promise<void>;
  scanForDevices(): void;
  requestPermissions(): Promise<boolean>;
  disconnectFromDevice: () => void;
}

export { IBluetoothManager };
