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

    case "INCLUDE_RETURN_Value":
      return {
        ...state,
        returnedValues: [...state.returnedValues, action.payload],
      };

    case "RESET_RETURN_VALUES":
      return {
        ...state,
        returnedValues: [],
      };

    case "RESET_BLUETOOTH":
      return {
        ...state,
        connectedDevice: null,
        deviceIsConnected: false,
      };

    case "RESET_TOTAL":
      return (state = initialState);

    default:
      return state;
  }
};

export { reducer };
