import { initialState } from "./initial-state";
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

    case "SET_DEVICES":
      return {
        ...state,
        devices: action.payload,
      };

    case "REMOVE_DEVICES":
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
        deviceIsConnected: action.payload,
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

    case "SET_VALUES":
      return {
        ...state,
        values: [...state.values, action.payload],
      };

    case "REMOVE_VALUES":
      return {
        ...state,
        values: [],
      };

    case "RESET_BLUETOOTH":
      return {
        ...state,
        connectedDevice: null,
        deviceIsConnected: false,
      };

    case "RESET_STATE":
      return (state = initialState);

    default:
      return state;
  }
};

export { reducer };
