import { ReactNode } from "react";
import { ICustomer } from "@interfaces/ICustomer";

type CustomerContextData = {
  customer: ICustomer | null;
  whatsapp: string;
  addCustomer: (customer: ICustomer) => Promise<void>;
  resetCustomer: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

type AuthState = {
  customer: ICustomer | null;
  whatsapp: string;
};

type AuthAction =
  | { type: "SET_CUSTOMER"; payload: ICustomer }
  | { type: "SET_WHATSAPP"; payload: string }
  | { type: "RESET_CUSTOMER" };

export { CustomerContextData, CustomerProviderProps, AuthState, AuthAction };
