import * as yup from "yup";
import uuid from "react-native-uuid";

import { IInput } from "../types";
import { Messages } from "@typings/index";

const inputs: IInput[] = [
  {
    id: uuid.v4().toString(),
    title: "Nome",
    name: "equipmentName",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Identificador",
    name: "equipmentIdentifier",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Modelo",
    name: "equipmentModel",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Placa",
    name: "equipmentPlate",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Ano",
    name: "equipmentYear",
    keyboardType: "numeric",
  },
  {
    id: uuid.v4().toString(),
    title: "Serial Dispositivo",
    name: "deviceSerial",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Chave Dispositivo",
    name: "devicekey",
    keyboardType: "default",
  },
  {
    id: uuid.v4().toString(),
    title: "Horímetro Inicial",
    name: "initialHourMeter",
    keyboardType: "numeric",
  },
  {
    id: uuid.v4().toString(),
    title: "Hodômetro Inicial",
    name: "initialOdometer",
    keyboardType: "numeric",
  },
];

const schema = yup.object({
  equipmentName: yup.string().required("Informe o seguinte campo"),
  equipmentIdentifier: yup.string().required("Informe o seguinte campo"),
  equipmentModel: yup.string().required("Informe o seguinte campo"),
  equipmentPlate: yup.string().required("Informe o seguinte campo"),
  equipmentYear: yup.string().required("Informe o seguinte campo"),
  deviceSerial: yup.string().required("Informe o seguinte campo"),
  devicekey: yup.string().required("Informe o seguinte campo"),
  initialHourMeter: yup.number().required("Informe o seguinte campo"),
  initialOdometer: yup.number().required("Informe o seguinte campo"),
});

const resposta: Messages = {
  0: {
    title: "Equipamento cadastrado com sucesso.",
    subtitle: "Mostrar equipamentos.",
  },
  1: {
    title: "Dispositivo não localizado",
    subtitle: "Dispositivo não localizado",
  },
  2: {
    title: "Não é possível utilizar este dispositivo",
    subtitle: "Não é possível utilizar este dispositivo",
  },
  3: {
    title: "Não é possível vincular um dispositivo a este equipamento",
    subtitle: "Não é possível vincular um dispositivo a este equipamento",
  },
  4: {
    title: "Nome do agrupamento já existe",
    subtitle: "Nome do agrupamento já existe",
  },
  5: {
    title: "Nome do equipamento já cadastrado",
    subtitle: "Nome do equipamento já cadastrado",
  },
  6: {
    title: "Identificador do equipamento já cadastrado",
    subtitle: "Identificador do equipamento já cadastrado",
  },
  7: {
    title: "Placa do equipamento já cadastrado",
    subtitle: "Placa do equipamento já cadastrado",
  },
  8: {
    title: "Falha na gravação/alteração",
    subtitle: "Falha na gravação/alteração",
  },
};

export { resposta, inputs, schema };
