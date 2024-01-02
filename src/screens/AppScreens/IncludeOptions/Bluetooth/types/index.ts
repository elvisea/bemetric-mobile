import { Device } from "react-native-ble-plx";

type InitialState = {
  devices: Device[];
  bluetoothEnabled: boolean;
  permissionsGranted: boolean;
};

export { InitialState };
