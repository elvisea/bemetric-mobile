import { AuthAction, AuthState } from "./types";

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER_AND_AUTHENTICATE":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "UPDATE_USER":
      return {
        ...state,
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
