type WIFI_AP_LIST = {
  WIFI_AP_AUTH: string;
  WIFI_AP_RSSI: string;
  WIFI_AP_SSID: string;
};

type INetwork = {
  GET_WIFI_LIST: string;
  WIFI_SCAN_STATUS: string;
  WIFI_AP_LIST: WIFI_AP_LIST[];
};

export { INetwork, WIFI_AP_LIST };
