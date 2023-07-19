import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Informe o nome."),
  senha: yup.string().required("Informe a senha."),
});

export { schema };
