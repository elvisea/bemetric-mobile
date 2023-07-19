import * as yup from "yup";

const schema = yup.object({
  serial: yup.string().required("Informe o serial."),
  chave: yup.string().required("Informe a chave."),
});

export { schema };
