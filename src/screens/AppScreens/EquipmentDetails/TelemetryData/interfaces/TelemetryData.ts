import { ReactNode } from "react";

interface ITelemetryData {
  horasLigadas: number;
  horasTrabalhadas: number;
  kmRodados: number;
  velocidadeMedia: number;
}

interface IList {
  [index: number]: {
    url: string;
    icon: ReactNode;
    title: string;
    value: number | null;
    label: string;
  };
}

export { ITelemetryData, IList };
