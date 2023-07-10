import * as yup from "yup";

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
      "A confirmação da senha não confere"
    ),
});

export { schema };
