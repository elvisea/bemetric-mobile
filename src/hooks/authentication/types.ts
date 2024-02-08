import { ReactNode } from "react";
import { User } from "@typings/index";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  signIn: (data: User) => Promise<void>;
  signOut: () => Promise<void>;

  fetchDataUser: () => void;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

type AuthAction =
  | { type: "SIGN_IN"; payload: User }
  | { type: "SIGN_OUT" }
  | { type: "LOADING" };

export { AuthContextData, AuthProviderProps, AuthState, AuthAction };
