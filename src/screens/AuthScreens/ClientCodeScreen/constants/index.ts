import * as yup from "yup";

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

export { schema };
