import { AuthAction, AuthState } from "./types";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_CUSTOMER":
      return {
        ...state,
        customer: action.payload,
      };
    case "RESET_CUSTOMER":
      return {
        ...state,
        customer: null,
      };

    default:
      return state;
  }
};

export { reducer };
