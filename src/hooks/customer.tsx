import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CUSTOMER } from "@constants/storage";
import { ICustomer } from "@interfaces/ICustomer";

type CustomerContextData = {
  customer: ICustomer | null;
  addCustomer: (customer: ICustomer) => Promise<void>;
  resetCustomerState: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

export const CustomerContext = createContext({} as CustomerContextData);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const addCustomer = async (customer: ICustomer) => {
    setCustomer(customer);
    await AsyncStorage.setItem(CUSTOMER, JSON.stringify(customer));
  };

  const resetCustomerState = () => setCustomer(null);

  const loadCustomerStorage = async () => {
    const storage = await AsyncStorage.getItem(CUSTOMER);
    if (storage) {
      const data = (await JSON.parse(storage)) as ICustomer;
      setCustomer(data);
    }
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
