import * as yup from "yup";

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

const resposta = {
  0: {
    title: "Token Inválido",
    subtitle: "Verifique o token inserido e tente novamente",
    text: "Tentar Novamente",
  },
  1: {
    title: "Falha na Conexão",
    subtitle: "Não foi possível conectar com o servidor",
    text: "Tentar Novamente",
  },
};

export { schema, resposta };
