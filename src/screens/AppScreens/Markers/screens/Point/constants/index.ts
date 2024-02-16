import { State } from "../types";

const url = {
  update: "/PontoInteresse/Gravar",
  delete: "/PontoInteresse/Excluir",
  list: "/PontoInteresse/ObterLista",
};

const responses = {
  update: {
    0: {
      title: "Atualização Concluída",
      subtitle: "O Ponto de Interesse foi atualizado com sucesso.",
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
      title: "Atualização Não Realizada",
      subtitle:
        "Ocorreu um erro ao tentar atualizar o Ponto de Interesse. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico.",
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
  },
  delete: {
    0: {
      title: "Exclusão Concluída",
      subtitle: "O Ponto de Interesse foi excluído com sucesso.",
      text: "Visualizar Pontos",
    },
    1: {
      title: "Exclusão Não Realizada",
      subtitle:
        "Não foi possível excluir o Ponto de Interesse. Verifique sua conexão e tente novamente ou entre em contato com o suporte técnico.",
    },
    3: {
      title: "Erro desconhecido",
      subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
    },
    4: {
      title: "Erro de Comunicação",
      subtitle:
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
    },
  },
};

const initialUpdatedPoint = {
  alert: false,
  permanence: false,
  duration: undefined,
  client: 0,
  partner: 0,
  code: 0,
  description: "",
  coord: { latitude: 0, longitude: 0 },
  name: "",
  radius: 0,
};

const initialState: State = {
  point: null,
  initialRegion: undefined,
  updatedPoint: initialUpdatedPoint,
  responses,
  isEditMode: false,
  isLoading: false,
  isOpenModal: false,
};

export { responses, url, initialState, initialUpdatedPoint };
