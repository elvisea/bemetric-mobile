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
  updateUser: (user: User) => Promise<void>;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

type AuthAction =
  | { type: "SET_USER_AND_AUTHENTICATE"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SIGN_OUT" }
  | { type: "LOADING" };

export { AuthContextData, AuthProviderProps, AuthState, AuthAction };
