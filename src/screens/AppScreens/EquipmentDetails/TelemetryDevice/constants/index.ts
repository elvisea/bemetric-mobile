import { TypeInitialState } from "../types";

const response: { [key: number]: { title: string; subtitle: string } } = {
  0: {
    title: "Dispositivo não encontrado.",
    subtitle:
      "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente.",
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
};

const initialState: TypeInitialState = {
  values: [],
  devices: [],
  isLoading: false,
  isConnecting: false,
  bluetoothEnabled: false,
  permissionsGranted: false,
};

export { response, initialState };
