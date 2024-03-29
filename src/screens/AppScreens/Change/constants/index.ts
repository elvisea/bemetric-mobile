import { Responses } from "@typings/index";
import { State } from "../types";

const responses: Responses = {
  0: {
    title: "Equipamento Desvinculado do Dispositivo",
    subtitle: "Equipamento Desvinculado do Dispositivo",
  },
  1: {
    title: "Equipamento Não Localizado",
    subtitle: "Equipamento Não Localizado",
  },
  2: {
    title: "Falha Ao Tentar Desvincular Equipamento",
    subtitle: "Falha Ao Tentar Desvincular Equipamento",
  },
  3: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const initialState: State = {
  isLoading: false,
  isOpenModal: false,
  equipments: [],
  action: "desvincular",
  selected: null,
  responses,
};

export { initialState };
