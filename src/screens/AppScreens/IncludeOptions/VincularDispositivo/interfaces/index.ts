interface IFormProps {
  chave: string;
  serial: string;
}

interface IParams {
  id?: string;
  chave?: string;
  serial?: string;
}

interface IResponsStatus {
  WIFI_STATUS_CONNECTION: string;
  WIFI_STATUS_SSID?: string;
  WIFI_STATUS_BSSID?: string;
  GET_WIFI_STATUS: string;
}

type IResponseObject = object | null | undefined;

export { IFormProps, IParams, IResponsStatus, IResponseObject };
