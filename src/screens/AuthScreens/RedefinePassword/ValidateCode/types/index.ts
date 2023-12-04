type TypeResponse = {
  resend: { [key: number]: { title: string; subtitle: string } };
  validation: { [key: number]: { title: string; subtitle: string } };
};

interface FormProps {
  [index: string]: string;
}

interface Params {
  email: string;
}

export { TypeResponse, FormProps, Params };
