import * as yup from "yup";

const responses: { [index: number]: string } = {
  0: "Senha Alterada com sucesso",
  1: "Senha ou Nova Senha não informados",
  2: "Senha e Nova senha são iguais",
  3: "Senha Atual informada é inválida",
  4: "Erro na alteração da senha atual",
};

const schema = yup.object({
  newPassword: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
  current: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
  confirmNewPassword: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf(
      [yup.ref("newPassword"), null],
      "A confirmação da senha não confere",
    ),
});

export { responses, schema };
