import { AuthAction, AuthState } from "./types";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_DEVICE":
      return {
        ...state,
        connectedDevice: action.payload,
      };

    case "REMOVE_DEVICE":
      return {
        ...state,
        connectedDevice: null,
      };

    case "SET_DEVICE_LIST":
      return {
        ...state,
        devices: action.payload,
      };

    case "REMOVE_DEVICES_LIST":
      return {
        ...state,
        devices: [],
      };

    case "BLUETOOTH_STATE":
      return {
        ...state,
        bluetoothState: action.payload,
      };

    case "CONNECT_DEVICE":
      return {
        ...state,
        deviceIsConnected: !state.deviceIsConnected,
      };

    case "ENABLE_BLUETOOTH":
      return {
        ...state,
        bluetoothEnabled: action.payload,
      };

    case "PERMISSIONS_GRANTED":
      return {
        ...state,
        permissionsGranted: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
