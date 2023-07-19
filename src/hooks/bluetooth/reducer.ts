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

    case "SET_DEVICE_RESPONSE":
      return {
        ...state,
        deviceResponse: action.payload,
      };

    case "RESET_DEVICE_RESPONSE":
      return {
        ...state,
        deviceResponse: undefined,
      };

    case "SET_SERVICE_UUID":
      return {
        ...state,
        serviceUUID: action.payload,
      };

    case "RESET_SERVICE_UUID":
      return {
        ...state,
        serviceUUID: "",
      };

    case "SET_CHARACTERISTIC_UUID":
      return {
        ...state,
        characteristicUUID: action.payload,
      };

    case "RESET_CHARACTERISTIC_UUID":
      return {
        ...state,
        characteristicUUID: "",
      };

    case "SET_COMMAND":
      return {
        ...state,
        command: action.payload,
      };

    case "RESET_BLUETOOTH":
      return {
        ...state,
        connectedDevice: null,
        deviceIsConnected: false,
        deviceResponse: undefined,
        command: {},
      };

    default:
      return state;
  }
};

export { reducer };
