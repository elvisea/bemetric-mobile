import * as yup from "yup";
import { State } from "react-native-ble-plx";

import { TypeInitialState, TypeInput, TypeResponses } from "../types";

const schema = yup.object({
  serial: yup.string().required("Informe o serial."),
  chave: yup.string().required("Informe a chave."),
});

const inputs: TypeInput[] = [
  {
    id: "01",
    title: "Serial",
    name: "serial",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Chave",
    name: "chave",
    keyboardType: "default",
  },
];

const responses: TypeResponses = {
  0: {
    title: "Dispositivo liberado para ser associado",
    subtitle: "Continue o processo de cadastro",
  },
  1: {
    title: "Dispositivo não localizado",
    subtitle: "Dispositivo não localizado",
  },
  2: {
    title: "Dispositivo não disponível",
    subtitle: "Dispositivo não liberado para ser associado",
  },
  3: {
    title: "Falha na verificação",
    subtitle: "Falha na verificação",
  },
  4: {
    title: "Dispositivo não encontrado",
    subtitle:
      "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente",
  },
  5: {
    title: "Dispositivo liberado.",
    subtitle: "Dispositivo liberado para ser associado. Continue seu cadastro.",
  },
  6: {
    title: "Credenciais inválidas.",
    subtitle: "Verifique se as credenciais de acesso estão corretas.",
  },
  7: {
    title: "Não foi possível conectar com o dispositivo",
    subtitle: "Não foi possível conectar com o dispositivo",
  },
};

const initialState: TypeInitialState = {
  values: [],
  devices: [],
  isLoading: false,
  bluetoothEnabled: false,
  permissionsGranted: false,
  bluetoothState: State.Unknown,
};

export { schema, inputs, responses, initialState };
