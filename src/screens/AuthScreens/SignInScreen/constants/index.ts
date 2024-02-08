import * as yup from "yup";

import { Responses } from "@typings/index";

const schema = yup.object({
  email: yup.string().required("Informe seu e-mail.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

const responses: Responses = {
  1: {
    title: "Erro ao tentar fazer login.",
    subtitle: "Email do login não cadastrado. Tente novamente.",
  },
  2: {
    title: "Erro ao tentar fazer login.",
    subtitle: "Email do login não habilitado. Tente novamente.",
  },
  3: {
    title: "Erro ao tentar fazer login.",
    subtitle: "Email do login não é de cliente. Tente novamente.",
  },
  4: {
    title: "Erro ao tentar fazer login.",
    subtitle: "Email ou Senha inválida. Tente novamente.",
  },
  5: {
    title: "Erro desconhecido",
    subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
  },
  6: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const initialState = {
  isLoading: false,
  responses,
};

export { schema, initialState };
