import uuid from "react-native-uuid";

import { Bluetooth } from "@screens/AppScreens/IncludeOptions/Bluetooth";
import { QRCode } from "@screens/AppScreens/IncludeOptions/QRCode";
import { VincularDispositivo } from "@screens/AppScreens/IncludeOptions/VincularDispositivo";
import { SuccessfullyConnected } from "@screens/AppScreens/IncludeOptions/SuccessfullyConnected";
import { ConfigurarConexaoDados } from "@screens/AppScreens/IncludeOptions/ConfigurarConexaoDados";
import { ListaRedes } from "@screens/AppScreens/IncludeOptions/ListaRedes";
import { ConexaoRedesMoveis } from "@screens/AppScreens/IncludeOptions/ConexaoRedesMoveis";
import { ConexaoManual } from "@screens/AppScreens/IncludeOptions/ConexaoManual";
import { EquipamentosDisponiveis } from "@screens/AppScreens/IncludeOptions/EquipamentosDisponiveis";
import { AddEquipment } from "@screens/AppScreens/IncludeOptions/AddEquipment";

const screens = [
  {
    key: uuid.v4().toString(),
    name: "Bluetooth",
    component: Bluetooth,
  },
  {
    key: uuid.v4().toString(),
    name: "QRCode",
    component: QRCode,
  },
  {
    key: uuid.v4().toString(),
    name: "VincularDispositivo",
    component: VincularDispositivo,
  },
  {
    key: uuid.v4().toString(),
    name: "SuccessfullyConnected",
    component: SuccessfullyConnected,
  },
  {
    key: uuid.v4().toString(),
    name: "ConfigurarConexaoDados",
    component: ConfigurarConexaoDados,
  },
  {
    key: uuid.v4().toString(),
    name: "ListaRedes",
    component: ListaRedes,
  },
  {
    key: uuid.v4().toString(),
    name: "ConexaoRedesMoveis",
    component: ConexaoRedesMoveis,
  },
  {
    key: uuid.v4().toString(),
    name: "ConexaoManual",
    component: ConexaoManual,
  },
  {
    key: uuid.v4().toString(),
    name: "EquipamentosDisponiveis",
    component: EquipamentosDisponiveis,
  },
  {
    key: uuid.v4().toString(),
    name: "AddEquipment",
    component: AddEquipment,
  },
];

export { screens };
