import { Device } from "react-native-ble-plx";

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

export { removeDuplicateDevices };
