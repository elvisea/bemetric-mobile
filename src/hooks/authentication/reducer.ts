import { AuthAction, AuthState } from "./types";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

export { reducer };
