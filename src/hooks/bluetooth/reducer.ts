import { initialState } from "./initial-state";
import { AuthAction, AuthState } from "./types";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_DEVICE":
      return {
        ...state,
        device: action.payload,
      };

    case "REMOVE_DEVICE":
      return {
        ...state,
        device: null,
      };

    case "ADD_VALUE":
      return {
        ...state,
        values: [...state.values, action.payload],
      };

    case "REMOVE_VALUES":
      return {
        ...state,
        values: [],
      };

    case "SET_RESPONSE":
      return {
        ...state,
        response: action.payload,
      };

    case "REMOVE_RESPONSE":
      return {
        ...state,
        response: {},
      };

    case "SET_BLUETOOTH_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "SET_BLUETOOTH":
      return {
        ...state,
        isEnabled: action.payload,
      };

    case "SET_PERMISSIONS":
      return {
        ...state,
        permissionsGranted: action.payload,
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

    case "RESET_STATE":
      return {
        ...initialState,
      };

    case "CLEAR_RECEIVED_VALUES":
      return {
        ...state,
        values: [],
        response: {},
      };

    default:
      return state;
  }
};

export { reducer };
