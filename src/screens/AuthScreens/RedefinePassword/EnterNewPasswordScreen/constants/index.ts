import { Responses } from "@typings/index";
import * as yup from "yup";

const schema = yup.object({
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password"), null], "A confirmação da senha não confere"),
});

const responses: Responses = {
  0: {
    title: "Senha redefinida com sucesso.",
    subtitle: "Senha redefinida com sucesso.",
    text: "Efetuar Login.",
  },
  1: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Código Inválido. Tente novamente.",
  },
  2: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Código de ativação expirado. Tente novamente.",
  },
  3: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Email não é do cliente. Tente novamente.",
  },
  4: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Email informado não está cadastrado. Tente novamente.",
  },
  5: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Email não habilitado. Tente novamente.",
  },
  6: {
    title: "Erro ao tentar criar nova senha.",
    subtitle: "Erro ao tentar criar nova senha.",
  },
};

export { schema, responses };
