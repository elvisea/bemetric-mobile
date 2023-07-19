import { State } from "react-native-ble-plx";

import { AuthState } from "./types";

const initialState: AuthState = {
  devices: [],
  connectedDevice: null,

  bluetoothState: State.Unknown,

  bluetoothEnabled: false,
  deviceIsConnected: false,

  serviceUUID: "",
  characteristicUUID: "",

  command: {},

  deviceResponse: undefined,

  permissionsGranted: false,
};

export { initialState };
