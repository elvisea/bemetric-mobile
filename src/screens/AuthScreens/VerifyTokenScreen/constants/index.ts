import * as yup from "yup";
import { TypeResponses } from "../types";

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

const responses: TypeResponses = {
  0: {
    title: "Conta criada com sucesso!",
    subtitle: "Conta criada com sucesso. Você já fazer login na sua conta!",
  },
  1: {
    title: "Erro ao tentar criar conta.",
    subtitle: "Erro no código de ativação. Tente novamente.",
  },
  2: {
    title: "Erro ao tentar criar conta.",
    subtitle: "Erro código de ativação expirado. Tente novamente.",
  },
  3: {
    title: "Erro ao tentar criar conta.",
    subtitle: "Email já cadastrado. Tente novamente.",
  },
  4: {
    title: "Erro ao tentar criar conta.",
    subtitle: "CNPJ ou CPF já existente. Tente novamente.",
  },
  5: {
    title: "Erro ao tentar criar conta.",
    subtitle: "Token do cliente não existe. Tente novamente.",
  },
};

export { schema, responses };
