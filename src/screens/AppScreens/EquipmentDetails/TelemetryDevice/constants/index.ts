import { TypeInitialState } from "../types";

const response: { [key: number]: { title: string; subtitle: string } } = {
  0: {
    title: "Dispositivo não encontrado.",
    subtitle: "Verifique se o dispositivo está ligado.",
  },
  1: {
    title: "Informações para conexão não estão disponíveis.",
    subtitle: "Informações para conexão não estão disponíveis.",
  },
  2: {
    title: "Dispositivo Desconectado.",
    subtitle: "Você precisa estar conectado para Configurar Conexão de Dados.",
  },
  3: {
    title: "Dispositivo Desconectado.",
    subtitle: "Você precisa estar conectado para testar Dispositivo.",
  },
  4: {
    title: "Não foi possível conectar com o dispositivo",
    subtitle: "Não foi possível conectar com o dispositivo",
  },
};

const initialState: TypeInitialState = {
  data: null,
  signals: {},
  title: "Desconectado",
  isLoading: false,
  isConnecting: false,
};

export { response, initialState };
