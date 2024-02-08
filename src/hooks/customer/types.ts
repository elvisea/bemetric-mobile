import { ReactNode } from "react";
import { Customer } from "@typings/index";

type CustomerContextData = {
  customer: Customer | null;
  whatsapp: string;
  addCustomer: (customer: Customer) => Promise<void>;
  resetCustomer: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

type AuthState = {
  customer: Customer | null;
  whatsapp: string;
};

type AuthAction =
  | { type: "SET_CUSTOMER"; payload: Customer }
  | { type: "SET_WHATSAPP"; payload: string }
  | { type: "RESET_CUSTOMER" };

export { CustomerContextData, CustomerProviderProps, AuthState, AuthAction };
