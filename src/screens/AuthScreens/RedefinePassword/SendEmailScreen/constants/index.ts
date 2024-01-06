import * as yup from "yup";

const response: { [key: number]: { title: string; subtitle: string } } = {
  1: {
    title: "Erro ao tentar redefinir senha.",
    subtitle: "Email não foi encontrado. Tente novamente.",
  },
  2: {
    title: "Erro ao tentar redefinir senha.",
    subtitle: "Email não está habilitado.",
  },
  3: {
    title: "Erro ao tentar redefinir senha.",
    subtitle: "Email inválido. Tente novamente",
  },
};

const schema = yup.object({
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
});

export { response, schema };