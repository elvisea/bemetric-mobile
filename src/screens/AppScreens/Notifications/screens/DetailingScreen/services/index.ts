import api from "@services/api";

import { Data, Fetch } from "../types";
import { normalizeData } from "../functions";

export async function getData({
  user,
  event,
  device,
  equipment,
}: Fetch): Promise<Data> {
  const data = {
    localDashboard: 3,
    codigoUsuario: user,

    codigoEvento: event,
    codigoEquipamento: equipment,
    codigoDispositivo: device,
  };
  const response = await api.post("/Evento/DetalharEvento", data);

  return normalizeData(response.data);
}
