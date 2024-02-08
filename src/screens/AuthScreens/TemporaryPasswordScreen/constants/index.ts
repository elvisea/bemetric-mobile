import { Responses } from "@typings/index";
import * as yup from "yup";

const schema = yup.object({
  novaSenha: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  novaSenhaConfirmada: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("novaSenha"), null], "A confirmação da senha não confere"),
});

const reponses: Responses = {
  0: {
    title: "Senha Alterada Com Sucesso.",
    subtitle: "Senha Alterada Com Sucesso.",
    text: "Efetuar Login.",
  },

  1: {
    title: "Falha ao tentar alterar senha.",
    subtitle: "Falha ao tentar alterar senha.",
  },

  2: {
    title: "Falha ao tentar alterar senha.",
    subtitle: "Falha ao tentar alterar senha.",
  },

  3: {
    title: "Erro ao tentar alterar senha.",
    subtitle: "Erro ao tentar alterar senha.",
  },
};

export { schema, reponses };
