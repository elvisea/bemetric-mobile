import { Responses } from "@typings/index";

const responses: Record<
  "resend" | "validation" | "unknown" | "network",
  Responses
> = {
  resend: {
    0: {
      title: "Código Reenviado",
      subtitle:
        "Um novo código de verificação foi enviado ao seu e-mail. Por favor, verifique sua caixa de entrada e siga as instruções contidas no e-mail.",
    },
    1: {
      title: "Não foi possível concluir a redefinição de senha",
      subtitle: "Verifique as informações fornecidas e tente novamente.",
    },
    2: {
      title: "Não foi possível concluir a redefinição de senha",
      subtitle: "Verifique as informações fornecidas e tente novamente.",
    },
    3: {
      title: "Não foi possível concluir a redefinição de senha",
      subtitle: "Verifique as informações fornecidas e tente novamente.",
    },
  },
  validation: {
    0: {
      title: "Verificação Bem-sucedida",
      subtitle:
        "O código de verificação foi aceito com sucesso. Você pode prosseguir para o próximo passo.",
      text: "Próximo Passo",
    },
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
  unknown: {
    0: {
      title: "Erro desconhecido",
      subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
    },
  },
  network: {
    0: {
      title: "Erro de Comunicação",
      subtitle:
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
    },
  },
};

const initialState = {
  responses,
  isSending: false,
  isResending: false,
  isFormValid: false,
  values: Array(6).fill(""),
};

export { responses, initialState };
