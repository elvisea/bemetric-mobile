import { ReactNode } from "react";
import { ICustomer } from "@interfaces/ICustomer";

type CustomerContextData = {
  customer: ICustomer | null;
  addCustomer: (customer: ICustomer) => Promise<void>;
  resetCustomer: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

type AuthState = {
  customer: ICustomer | null;
};

type AuthAction =
  | { type: "SET_CUSTOMER"; payload: ICustomer }
  | { type: "RESET_CUSTOMER" };

export { CustomerContextData, CustomerProviderProps, AuthState, AuthAction };
