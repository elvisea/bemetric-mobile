import {
  CHARACTERISTIC_UUID,
  MONITORED_FEATURE_UUID,
  SERVICE_UUID,
} from "@hooks/uuid";

import { Buffer } from "buffer";

import {
  BleManager,
  Device,
  State,
  Subscription,
  Service,
  Characteristic,
} from "react-native-ble-plx";

class BluetoothManager {
  private static instance: BluetoothManager | null = null;
  private manager: BleManager;
  private device: Device | null = null;

  constructor() {
    this.manager = new BleManager();
  }

  public static getInstance(): BluetoothManager {
    if (!BluetoothManager.instance) {
      BluetoothManager.instance = new BluetoothManager();
    }
    return BluetoothManager.instance;
  }

  isDeviceConnected = async (id: string): Promise<boolean> => {
    try {
      const device = await this.manager.isDeviceConnected(id);
      return device;
    } catch (error) {
      console.error(
        "Erro ao verificar se o dispositivo está conectado:",
        error,
      );
      return false;
    }
  };

  monitorBluetoothState = (callback: (state: State) => void): Subscription => {
    try {
      const stateChangeListener = this.manager.onStateChange(callback, true);
      return stateChangeListener;
    } catch (error) {
      console.error("Erro ao monitorar o estado do Bluetooth:", error);
      throw error;
    }
  };

  connectedDevices = async () => {
    try {
      return await this.manager.connectedDevices([]);
    } catch (error) {
      console.error(`Error when trying to search for connected devices`, error);
    }
  };

  disconnectToDevice = async (): Promise<void> => {
    try {
      if (this.device && (await this.device.isConnected())) {
        await this.manager.cancelDeviceConnection(this.device.id);
        this.device = null;
      }
    } catch (error) {
      console.error("Error disconnecting device:", error);
    }
  };

  isConnected = async (): Promise<boolean> => {
    if (this.device) {
      try {
        return await this.device.isConnected();
      } catch (error) {
        console.error(
          `Error when trying to find out if device is connected ${this.device.id}`,
          error,
        );
      }
    }

    return false;
  };

  connectToDevice = async (id: string): Promise<Device | null> => {
    try {
      if (this.device) {
        const isConnected = await this.device.isConnected();
        if (isConnected) {
          return this.device;
        } else {
          this.device = null;
        }
      }

      const device = await this.manager.connectToDevice(id, {
        requestMTU: 500,
      });

      const isConnected = await device.isConnected();
      if (isConnected) {
        this.device = device;
        return device;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro durante a conexão ao dispositivo:", error);
      return null;
    }
  };

  monitorCharacteristic = async (
    callback: (value: string) => void,
  ): Promise<Subscription | undefined> => {
    try {
      if (this.device) {
        const device =
          await this.device.discoverAllServicesAndCharacteristics();

        const services = await device.services();
        const service = services.find(
          (service) => service.uuid === SERVICE_UUID,
        );

        if (!service) {
          console.error(`Service with UUID ${SERVICE_UUID} not found.`);
          return;
        }

        const characteristics = await service.characteristics();
        const characteristic = characteristics.find(
          (item) => item.uuid === MONITORED_FEATURE_UUID,
        );

        if (!characteristic) {
          console.error(
            `Characteristic with UUID ${MONITORED_FEATURE_UUID} not found.`,
          );
          return;
        }

        const subscription = characteristic.monitor((error, characteristic) => {
          if (error) {
            console.error("Error monitoring characteristic:", error);
            return;
          }

          if (characteristic) {
            if (characteristic.value) {
              callback(characteristic.value);
            }
          }
        });

        return subscription;
      } else {
        console.error("Device is not connected");
      }
    } catch (error) {
      console.error("Error monitoring characteristic:", error);
    }
  };

  cancelTransaction = () => {
    if (this.device) {
      this.manager.cancelTransaction(this.device.id);
    }
  };

  discoverService = async (
    device: Device,
    serviceUUID: string,
  ): Promise<Service | undefined> => {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      return services.find((service) => service.uuid === serviceUUID);
    } catch (error) {
      console.error("Error discovering service:", error);
      return undefined;
    }
  };

  discoverCharacteristic = async (
    service: Service,
    characteristicUUID: string,
  ): Promise<Characteristic | undefined> => {
    try {
      const characteristics = await service.characteristics();
      return characteristics.find((char) => char.uuid === characteristicUUID);
    } catch (error) {
      console.error("Error discovering characteristic:", error);
      return undefined;
    }
  };

  writeCharacteristic = async (command: object): Promise<void> => {
    try {
      if (this.device) {
        const service = await this.discoverService(this.device, SERVICE_UUID);

        if (!service) {
          console.error(`Service with UUID ${SERVICE_UUID} not found.`);
          return;
        }

        const characteristic = await this.discoverCharacteristic(
          service,
          CHARACTERISTIC_UUID,
        );

        if (!characteristic) {
          console.error(
            `Characteristic with UUID ${CHARACTERISTIC_UUID} not found.`,
          );
          return;
        }

        const HEADER = [0x4d, 0x00, 0x00, 0x2c];

        let commandString = JSON.stringify(command);
        const commandBuffer = Buffer.from(commandString);

        const size = commandString.length;
        HEADER[3] = size;

        const concatenatedBuffer = Buffer.concat([
          Buffer.from(HEADER),
          commandBuffer,
        ]);

        const valueBase64 = concatenatedBuffer.toString("base64");

        await characteristic.writeWithResponse(valueBase64, this.device.id);
      }
    } catch (error) {
      console.error("Error writing characteristic:", error);
    }
  };

  scanForDevices = (callback: (devices: Device[]) => void): void => {
    try {
      this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error("Error when trying to scan for devices", error);
          return;
        }

        if (device && device.name?.includes("B2K")) {
          callback([device]);
        }
      });
    } catch (error) {
      console.error("Error when trying to scan for devices", error);
    }
  };

  stopScan = (): void => {
    try {
      this.manager.stopDeviceScan();
    } catch (error) {
      console.error("Error stopping device scan", error);
    }
  };

  destroy = (): void => {
    try {
      this.manager.destroy();
    } catch (error) {
      console.error("Error destroying Bluetooth Manager:", error);
    }
  };
}

export default BluetoothManager;
