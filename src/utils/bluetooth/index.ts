import { Buffer } from "buffer";
import { Device } from "react-native-ble-plx";

const REGEX = /[\u0000-\u001F]/g;

const removeDuplicateDevices = (devices: Device[]): Device[] => {
  const uniqueDevices: { [deviceId: string]: Device } = {};

  const uniqueDeviceArray = devices.filter((device) => {
    const deviceId = device.id;

    if (!uniqueDevices[deviceId]) {
      uniqueDevices[deviceId] = device;
      return true;
    }

    return false;
  });

  return uniqueDeviceArray;
};

const removeSpecificBytes = (value: string) => {
  const bufferValue = Buffer.from(value, "base64");

  if (bufferValue[1] === 0x04) {
    const newBufferValue = Buffer.allocUnsafe(bufferValue.length - 4);
    bufferValue.copy(newBufferValue, 0, 4, bufferValue.length);
    return newBufferValue.toString("base64");
  } else if (bufferValue[1] === 0x14) {
    const newBufferValue = Buffer.allocUnsafe(bufferValue.length - 6);
    bufferValue.copy(newBufferValue, 0, 6, bufferValue.length);
    return newBufferValue.toString("base64");
  } else {
    return value;
  }
};

const limparStrings = (strings: string[]) => {
  return strings.map((item) => item.replace(REGEX, ""));
};

const arraySemItensDuplicados = (array: string[]): string[] => {
  return Array.from(new Set(array));
};

const decodeAndCleanReceivedValues = (values: string[]): object => {
  if (values.length === 0) {
    return {};
  }

  const stringsDecodificadas = values.map((value) =>
    Buffer.from(value, "base64").toString("utf8"),
  );

  const arrayComItensUnicos = arraySemItensDuplicados(stringsDecodificadas);

  const stringsLimpas = limparStrings(arrayComItensUnicos);

  try {
    const isValidJSON = JSON.parse(stringsLimpas.join(""));
    return isValidJSON;
  } catch (error) {
    return {};
  }
};

const generateResponse = (values: string[]): object => {
  const valuesWithoutSpecificBytes = values.map((value) =>
    removeSpecificBytes(value),
  );

  const decodedAndCleanedData = decodeAndCleanReceivedValues(
    valuesWithoutSpecificBytes,
  );

  return decodedAndCleanedData;
};

export { removeDuplicateDevices, generateResponse };
