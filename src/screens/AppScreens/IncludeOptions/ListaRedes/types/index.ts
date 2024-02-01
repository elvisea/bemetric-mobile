type WIFI_AP_LIST = {
  KEY: string;
  WIFI_AP_AUTH: string;
  WIFI_AP_RSSI: string;
  WIFI_AP_SSID: string;
};

type TypeNetwork = {
  GET_WIFI_LIST: string;
  WIFI_SCAN_STATUS: string;
  WIFI_AP_LIST: WIFI_AP_LIST[];
};

type TypeInitialState = {
  isLoading: boolean;
  network: WIFI_AP_LIST[];
};

export { WIFI_AP_LIST, TypeInitialState, TypeNetwork };
