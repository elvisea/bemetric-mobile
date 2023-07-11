import React, { useEffect, useContext, useReducer, createContext } from "react";

import axios from "axios";
import { Alert } from "react-native";

import api from "@services/api";

import { IUser } from "@interfaces/IUser";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { AuthContextData, AuthProviderProps } from "./types";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storage-user";

import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from "@storage/storage-token";

export const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: false,
  isAuthenticated: false,

  signIn: async () => {},
  signOut: async () => {},

  fetchDataUser: async () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("User:", state);

  const loadUserFromStorage = async () => {
    const userFromStorage = await storageUserGet();
    if (userFromStorage) {
      dispatch({ type: "SIGN_IN", payload: userFromStorage });
    }
  };

  const loadTokenFromStorage = async () => {
    const tokenFromStorage = await storageTokenGet();
    if (tokenFromStorage) {
      api.defaults.headers.common.Authorization = `Bearer ${tokenFromStorage}`;
    }
  };

  const fetchDataUser = async () => {
    try {
      const response = await api.post("/Usuario/ListaUsuarios", {
        codigoUsuario: state.user?.codigoUsuario,
      });

      await storageUserSave(response.data[0]);

      dispatch({ type: "SIGN_IN", payload: response.data[0] });
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const signIn = async (data: IUser) => {
    dispatch({ type: "LOADING" });

    dispatch({ type: "SIGN_IN", payload: data });

    api.defaults.headers.common.Authorization = `Bearer ${data.jwtToken}`;

    await storageUserSave(data);
    await storageTokenSave(data.jwtToken);

    dispatch({ type: "LOADING" });
  };

  const signOut = async () => {
    dispatch({ type: "LOADING" });

    dispatch({ type: "SIGN_OUT" });

    await storageUserRemove();
    await storageTokenRemove();

    api.defaults.headers.common.Authorization = undefined;

    dispatch({ type: "LOADING" });
  };

  useEffect(() => {
    dispatch({ type: "LOADING" });

    loadUserFromStorage();
    loadTokenFromStorage();

    dispatch({ type: "LOADING" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,

        signIn,
        signOut,

        fetchDataUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
