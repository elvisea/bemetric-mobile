import { Responses } from "@typings/index";
import { State } from "../types";

const responses: Responses = {
  0: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const initialState: State = {
  data: null,
  equipment: null,
  responses,
  isLoading: false,
};

export { initialState };
