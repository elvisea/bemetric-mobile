import { Messages } from "@typings/index";
import { State } from "../types";

const messages: Messages = {
  0: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const initialState: State = {
  data: null,
  equipment: null,
  messages,
  isLoading: false,
};

export { initialState };
