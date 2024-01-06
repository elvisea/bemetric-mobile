import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Informe seu email."),
  celular: yup.string().optional(),
  telefone: yup.string().optional(),
});

const responses: { [index: number]: string } = {
  0: "Usuário alterado com sucesso",
  1: "Usuário não existe",
  2: "Usuário não pode ser alterado",
};

export { responses, schema };
