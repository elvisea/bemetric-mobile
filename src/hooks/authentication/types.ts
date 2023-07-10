import { ReactNode } from "react";

import { IUser } from "@interfaces/IUser";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  signIn: (data: IUser) => Promise<void>;
  signOut: () => Promise<void>;

  fetchDataUser: () => void;
};

type AuthState = {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
};

type AuthAction =
  | { type: "SIGN_IN"; payload: IUser }
  | { type: "SIGN_OUT" }
  | { type: "LOADING" };

export { AuthContextData, AuthProviderProps, AuthState, AuthAction };
