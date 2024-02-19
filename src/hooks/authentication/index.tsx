import React, { useEffect, useContext, useReducer, createContext } from "react";

import { Alert } from "react-native";

import api from "@services/api";

import { User } from "@typings/index";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { AuthContextData, AuthProviderProps } from "./types";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from "@storage/functions";

export const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: false,
  isAuthenticated: false,

  signIn: async () => {},
  signOut: async () => {},
  updateUser: async () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUserFromStorage = async () => {
    const userFromStorage = await storageUserGet();

    if (userFromStorage) {
      dispatch({
        type: "SET_USER_AND_AUTHENTICATE",
        payload: userFromStorage,
      });
    }
  };

  const loadTokenFromStorage = async () => {
    const tokenFromStorage = await storageTokenGet();
    if (tokenFromStorage) {
      api.defaults.headers.common.Authorization = `Bearer ${tokenFromStorage}`;
    }
  };

  const updateUser = async (user: User) => {
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });

    await storageUserSave(user);
  };

  const signIn = async (data: User) => {
    try {
      dispatch({ type: "LOADING" });

      api.defaults.headers.common.Authorization = `Bearer ${data.jwtToken}`;
      await storageTokenSave(data.jwtToken);

      const response = await api.post("/Usuario/ListaUsuarios", {
        codigoUsuario: data.codigoUsuario,
      });

      dispatch({
        type: "SET_USER_AND_AUTHENTICATE",
        payload: response.data[0],
      });

      await storageUserSave(response.data[0]);
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      dispatch({ type: "LOADING" });
    }
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
        updateUser,
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
