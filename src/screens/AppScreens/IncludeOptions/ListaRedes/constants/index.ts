import { TypeInitialState, WIFI_AP_LIST } from "../types";

const initialState: TypeInitialState = {
  isLoading: false,
  network: [] as WIFI_AP_LIST[],
};

export { initialState };
