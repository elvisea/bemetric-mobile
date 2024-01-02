import { State } from "react-native-ble-plx";

import { AuthState } from "./types";

const initialState: AuthState = {
  values: [],
  devices: [],
  connectedDevice: null,
  deviceIsConnected: false,

  bluetoothState: State.Unknown,
  bluetoothEnabled: false,

  permissionsGranted: false,
};

export { initialState };
