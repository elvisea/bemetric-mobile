import { Responses } from "@typings/index";

const responses: Record<
  "validation" | "unknown" | "network" | "form",
  Responses
> = {
  validation: {
    0: {
      title: "Token Inválido",
      subtitle:
        "O token fornecido não é válido. Por favor, verifique se inseriu corretamente ou solicite um novo token.",
    },
    1: {
      title: "Token Válido",
      subtitle:
        "O token foi validado com sucesso. Você pode continuar com o próximo passo.",
    },
  },
  unknown: {
    0: {
      title: "Erro desconhecido",
      subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
    },
  },
  network: {
    0: {
      title: "Erro de Comunicação",
      subtitle:
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
    },
  },
  form: {
    0: {
      title: "Campos Incompletos",
      subtitle: "Por favor, preencha todos os campos para continuar.",
    },
  },
};

const initialState = {
  responses,
  isLoading: false,
  values: Array(6).fill(""),
};

export { initialState };
