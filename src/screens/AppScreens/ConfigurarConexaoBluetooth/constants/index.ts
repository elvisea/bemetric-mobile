import uuid from "react-native-uuid";

const options = [
  {
    id: uuid.v4().toString(),
    title: "Identificar Bluetooth",
    mt: 16,
    screen: "Bluetooth",
  },
  {
    id: uuid.v4().toString(),
    title: "Identificar QRCode",
    mt: 8,
    screen: "QRCode",
  },
  {
    id: uuid.v4().toString(),
    title: "Identificar Manualmente",
    mt: 8,
    screen: "VincularDispositivo",
  },
];

export { options };
