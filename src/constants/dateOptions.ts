interface IOptions {
  title: string;
  value: number;
}

export const dateOptions: IOptions[] = [
  { title: "Últimas 24 horas", value: 0 },
  { title: "Últimos 7 dias", value: 1 },
  { title: "Últimos 15 dias", value: 2 },
  { title: "Últimos 30 dias", value: 3 },
];
