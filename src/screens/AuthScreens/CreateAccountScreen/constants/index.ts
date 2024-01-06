import * as yup from "yup";

const schema = yup.object({
  client: yup.string().required("Informe o cliente"),
  identification: yup.string().required("Informe a identificação"),
});

export { schema };
