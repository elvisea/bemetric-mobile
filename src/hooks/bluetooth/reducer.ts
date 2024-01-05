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

    default:
      return state;
  }
};

export { reducer };
