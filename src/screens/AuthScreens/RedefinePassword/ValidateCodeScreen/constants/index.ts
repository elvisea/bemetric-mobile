import { Responses } from "@typings/index";
import * as yup from "yup";

const responses: Record<"resend" | "validation", Responses> = {
  resend: {
    1: {
      title: "Código Reenviado",
      subtitle:
        "Um novo código de verificação foi enviado ao seu e-mail. Por favor, verifique sua caixa de entrada e siga as instruções contidas no e-mail.",
    },
  },

  validation: {
    1: {
      title: "Falha na Verificação do Código",
      subtitle:
        "O código de verificação inserido é inválido. Por favor, verifique o código fornecido e tente novamente.",
    },
    2: {
      title: "Código Expirado",
      subtitle:
        "O código de verificação expirou. Solicite um novo código para continuar.",
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

export { responses, schema };
