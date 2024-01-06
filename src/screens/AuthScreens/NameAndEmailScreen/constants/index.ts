import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
});

export { schema };
