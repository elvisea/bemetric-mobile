type TypeResponse = {
  resend: { [key: number]: { title: string; subtitle: string } };
  validation: { [key: number]: { title: string; subtitle: string } };
};

type TypeForm = { [index: string]: string };

type TypeParams = { email: string };

export { TypeResponse, TypeForm, TypeParams };
