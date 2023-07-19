import * as yup from "yup";

const schema = yup.object({
  ponto: yup.string().required("Informe o ponto de acesso."),
  usuario: yup.string().required("Informe o usuário."),
  senha: yup.string().required("Informe a senha."),
});

export { schema };
