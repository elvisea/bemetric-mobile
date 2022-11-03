import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CUSTOMER } from "@constants/storage";

type CustomerContextData = {
  customer: string | null;
  addCustomer: (customer: string) => Promise<void>;
  resetCustomerState: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

export const CustomerContext = createContext({} as CustomerContextData);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<string | null>(null);

  const addCustomer = async (customer: string) => {
    setCustomer(customer);
    await AsyncStorage.setItem(CUSTOMER, customer);
  };

  const resetCustomerState = () => setCustomer(null);

  const loadCustomerStorage = async () => {
    const storage = await AsyncStorage.getItem(CUSTOMER);
    if (storage) setCustomer(storage);
  };

  useEffect(() => {
    loadCustomerStorage();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customer,
        addCustomer,
        resetCustomerState,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

function useCustomer() {
  const context = useContext(CustomerContext);

  return context;
}

export { CustomerProvider, useCustomer };
