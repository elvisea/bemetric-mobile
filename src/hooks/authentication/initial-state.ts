import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

export { initialState };
