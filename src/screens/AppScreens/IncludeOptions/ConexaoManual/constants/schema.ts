import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Informe o nome da rede."),
  senha: yup.string().required("Informe a senha da rede"),
});

export { schema };
