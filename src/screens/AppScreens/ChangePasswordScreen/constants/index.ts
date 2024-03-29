import * as yup from "yup";
import { Responses } from "@typings/index";

const schema = yup.object({
  newPassword: yup
    .string()
    .required("Informe sua nova senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
  current: yup
    .string()
    .required("Informe sua senha atual")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
  confirmNewPassword: yup
    .string()
    .required("Confirme sua nova senha")
    .oneOf(
      [yup.ref("newPassword"), null],
      "A confirmação da senha não confere",
    ),
});

const responses: Responses = {
  0: {
    title: "Senha Alterada com sucesso",
    subtitle: "Você pode agora fazer login com a nova senha.",
  },
  1: {
    title: "Senha ou Nova Senha não informados",
    subtitle: "Por favor, preencha todos os campos obrigatórios.",
  },
  2: {
    title: "Senha e Nova senha são iguais",
    subtitle: "A nova senha deve ser diferente da senha atual.",
  },
  3: {
    title: "Senha Atual informada é inválida",
    subtitle: "Verifique se a senha atual está correta e tente novamente.",
  },
  4: {
    title: "Erro na alteração da senha atual",
    subtitle:
      "Não foi possível processar a mudança. Tente novamente mais tarde.",
  },
  5: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
};

const initialState = {
  isVisible: false,
  isLoading: false,
  responses,
};

export { schema, initialState };
