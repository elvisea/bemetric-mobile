import { Responses } from "@typings/index";

const responses: Record<
  "resend" | "validation" | "unknown" | "network",
  Responses
> = {
  resend: {
    1: {
      title: "Código Reenviado",
      subtitle:
        "Um novo código de verificação foi enviado ao seu e-mail. Por favor, verifique sua caixa de entrada e siga as instruções contidas no e-mail.",
    },
  },
  validation: {
    0: {
      title: "Ativação Concluída",
      subtitle:
        "Seu usuário foi criado com sucesso. Você já pode fazer login na sua conta!",
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
    3: {
      title: "E-mail Já Cadastrado",
      subtitle:
        "O e-mail fornecido já está em uso. Por favor, utilize outro e-mail ou recupere sua senha.",
    },
    4: {
      title: "CNPJ/CPF Já Registrado",
      subtitle:
        "O CNPJ/CPF fornecido já está cadastrado. Por favor, verifique os dados ou entre em contato com o suporte.",
    },
    5: {
      title: "Token Não Encontrado",
      subtitle:
        "Não foi possível validar seu token. Por favor, solicite um novo ou entre em contato com o suporte.",
    },
    6: {
      title: "Erro de Processamento",
      subtitle:
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte.",
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
  values: Array(6).fill(""),
};

export { responses, initialState };
