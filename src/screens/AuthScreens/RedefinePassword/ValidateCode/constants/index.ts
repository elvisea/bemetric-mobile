import * as yup from "yup";
import { TypeResponse } from "../types";

const resposta: TypeResponse = {
  resend: {
    1: {
      title: "Código reenviado com sucesso.",
      subtitle: "Código reenviado com sucesso. Verifique seu e-mail.",
    },
  },

  validation: {
    1: {
      title: "Erro ao tentar validar código.",
      subtitle: "Código de verificação inválido. Tente novamente.",
    },
    2: {
      title: "Erro ao tentar validar código.",
      subtitle: "Código de verificação expirado. Tente novamente.",
    },
  },
};

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

export { resposta, schema };
