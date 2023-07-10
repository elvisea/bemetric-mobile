import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Informe seu email."),
  celular: yup.string().optional(),
  telefone: yup.string().optional(),
});

export { schema };
