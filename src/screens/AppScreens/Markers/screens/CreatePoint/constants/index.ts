import { Responses } from "@typings/index";
import { State } from "../types";

const responses: Responses = {
  0: {
    title: "Criação Concluída",
    subtitle: "O Ponto de Interesse foi criado com sucesso.",
    text: "Visualizar Pontos",
  },
  1: {
    title: "Cliente Não Encontrado",
    subtitle:
      "Não foi possível localizar o cliente. Verifique os dados inseridos e tente novamente.",
  },
  2: {
    title: "Nome Já Cadastrado",
    subtitle:
      "Um Ponto de Interesse com este nome já existe. Por favor, use um nome diferente.",
  },
  3: {
    title: "Criação Não Realizada",
    subtitle:
      "Ocorreu um erro ao tentar criar o Ponto de Interesse. Por favor, tente novamente mais tarde.",
  },
  4: {
    title: "Erro desconhecido",
    subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
  },
  5: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const point = {
  include: true,
  alert: false,
  permanence: false,
  duration: 0,
  client: 0,
  code: 0,
  description: "",
  coord: { latitude: -25.454195, longitude: -49.2890548 },
  name: "",
  radius: 100,
};

const initialState: State = {
  point,
  responses,
  isOpenModal: false,
  touchedMap: false,
};

export { responses, initialState };
