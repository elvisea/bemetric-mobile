import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@services/api";

import { TOKEN, USER } from "@constants/storage";

import { User } from "@interfaces/User";
import { Credentials } from "@interfaces/Credentials";

type AuthContextData = {
  user: User | null;
  signIn: ({ email, password }: Credentials) => Promise<void>;
  resetUserState: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async ({ email, password }: Credentials) => {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }

    try {
      const response = await api.post("/Usuario/ValidarLogin", {
        email,
        senha: password,
        tipoaplicacao: 0,
      });

      console.log("RES", response.data);

      if (response.status === 200) {
        const { data } = response;

        await AsyncStorage.setItem(TOKEN, data.jwtToken);
        await AsyncStorage.setItem(USER, JSON.stringify(data));

        api.defaults.headers.common.Authorization = `Bearer ${data.jwtToken}`;

        setUser(data);
      }

      if (response.data === 1) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não cadastrado. Tente novamente."
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não habilitado. Tente novamente."
        );
      }

      if (response.data === 3) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não é do cliente. Tente novamente."
        );
      }

      if (response.data === 4) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email ou Senha inválida. Tente novamente."
        );
      }

      if (response.data === 5) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email com senha temporária."
        );
      }
    } catch (error) {
      Alert.alert("Erro ao tentar fazer login!", `${error}`);
      console.log(error);
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
      const user = (await JSON.parse(storage)) as User;
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
