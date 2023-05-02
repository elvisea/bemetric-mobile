import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@services/api";

import { TOKEN, USER } from "@constants/storage";

import { IUser } from "@interfaces/IUser";

type AuthContextData = {
  user: IUser | null;
  signIn: (data: IUser) => Promise<void>;
  resetUserState: () => void;
  fetchDataUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchDataUser = async () => {
    const response = await api.post("/Usuario/ListaUsuarios", {
      codigoUsuario: user?.codigoUsuario,
    });

    await AsyncStorage.setItem(USER, JSON.stringify(response.data[0]));

    setUser(response.data[0]);
  };

  const signIn = async (data: IUser) => {
    try {
      await AsyncStorage.setItem(TOKEN, data.jwtToken);

      api.defaults.headers.common.Authorization = `Bearer ${data.jwtToken}`;

      setUser(data);

      const response = await api.post("/Usuario/ListaUsuarios", {
        codigoUsuario: data.codigoUsuario,
      });

      await AsyncStorage.setItem(USER, JSON.stringify(response.data[0]));

      setUser(response.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const loadTokenStorage = async () => {
    const storage = await AsyncStorage.getItem(TOKEN);

    if (storage) {
      api.defaults.headers.common.Authorization = `Bearer ${storage}`;
    }
  };

  const loadUserStorage = async () => {
    const storage = await AsyncStorage.getItem(USER);

    if (storage) {
      const user = (await JSON.parse(storage)) as IUser;
      setUser(user);
    }
  };

  const resetUserState = () => setUser(null);

  useEffect(() => {
    loadTokenStorage();
    loadUserStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        resetUserState,
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
