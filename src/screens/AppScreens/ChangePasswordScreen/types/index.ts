type Form = {
  current: string;
  newPassword: string;
  confirmNewPassword: string;
};

type Message = {
  [key: number]: { title: string; subtitle: string; text?: string };
};

export { Form, Message };
