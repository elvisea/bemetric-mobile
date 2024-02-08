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
  isLoading: false,
  expanded: "",
  count: { events: 0, messages: 0 },
  groupings: [],
  responses,
};

export { initialState };
