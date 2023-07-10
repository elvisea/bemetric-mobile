import { ReactNode } from "react";

interface IMessageType {
  [index: number]: {
    read: {
      color: string;
      icon: ReactNode;
    };
    unread: {
      color: string;
      icon: ReactNode;
    };
  };
}

export { IMessageType };
