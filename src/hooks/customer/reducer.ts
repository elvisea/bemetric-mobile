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
        whatsapp: "",
      };

    case "SET_WHATSAPP":
      return {
        ...state,
        whatsapp: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
