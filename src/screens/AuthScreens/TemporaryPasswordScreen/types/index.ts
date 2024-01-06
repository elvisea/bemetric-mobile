type TypeParams = { email: string; password: string };

type TypeForm = { novaSenha: string; novaSenhaConfirmada: string };

type TypeReponses = {
  [key: number]: { title: string; subtitle: string; text?: string };
};

export { TypeForm, TypeParams, TypeReponses };
