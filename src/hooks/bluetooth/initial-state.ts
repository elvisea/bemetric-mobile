import { State } from "react-native-ble-plx";
import { AuthState } from "./types";

const initialState: AuthState = {
  device: null,
  devices: [],
  values: [],
  response: {},
  status: State.Unknown,
  isEnabled: false,
  permissionsGranted: false,
};

export { initialState };
