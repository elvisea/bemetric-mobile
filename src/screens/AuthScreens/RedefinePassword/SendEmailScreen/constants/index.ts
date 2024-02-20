import * as yup from "yup";
import { Responses } from "@typings/index";

const SUCCESS = 0;
const GENERIC_ERROR = 4;
const NETWORK_ERROR = 5;

const responses: Responses = {
  1: {
    title: "Não foi possível concluir a redefinição de senha",
    subtitle: "Verifique as informações fornecidas e tente novamente.",
  },
  2: {
    title: "Não foi possível concluir a redefinição de senha",
    subtitle: "Verifique as informações fornecidas e tente novamente.",
  },
  3: {
    title: "Não foi possível concluir a redefinição de senha",
    subtitle: "Verifique as informações fornecidas e tente novamente.",
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

const schema = yup.object({
  email: yup
    .string()
    .required("Por favor, digite seu e-mail.")
    .email("Digite um e-mail válido, como usuario@exemplo.com"),
});

export { responses, schema, SUCCESS, GENERIC_ERROR, NETWORK_ERROR };
