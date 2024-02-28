import { formatHour } from "@utils/formatHours";
import { calculateInitialRegion } from "@screens/AppScreens/Markers/functions";

import { Data, ReceivedData } from "../types";

export const normalizeData = (data: ReceivedData): Data => {
  const coord = calculateInitialRegion([
    { latitude: data.latitude, longitude: data.longitude },
  ]);

  const initialRegion = {
    latitude: coord.latitude,
    longitude: coord.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return {
    equipment: {
      name: data.nomeEquipamento,
      status: {
        speed: data.velocidade,
        odometer: data.hodometro,
        hourmeter: formatHour(data.horimetro),
      },
    },

    initialRegion: initialRegion,

    coordinate: { latitude: data.latitude, longitude: data.longitude },
    coord: { type: data.tipoCoordenadas },
    geofence: data.geoFence ? data.geoFence : [],

    point: {
      radius: data.pointFence ? data.pointFence.raio : 0,
      coordinate: {
        latitude: data.pointFence ? data.pointFence.latitude : 0,
        longitude: data.pointFence ? data.pointFence.longitude : 0,
      },
    },

    marker: data.marcadorApp,
    register: data.registroApp,
    date: data.criadoEmFormatado,
  };
};
