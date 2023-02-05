import React, { ReactNode } from "react";

import {
  Modal as ModalReactNative,
  ModalProps,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons/";

import { Body, Box, Header } from "./styles";

interface ModalSelectProps extends ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  title: string;
  closeModal: () => void;
}

const Modal = ({ isOpen, title, closeModal, children }: ModalSelectProps) => {
  return (
    <ModalReactNative
      visible={isOpen}
      transparent
      animationType="slide"
      hardwareAccelerated
      onRequestClose={closeModal}
    >
      <Box>
        <Body>
          <Header>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="close" size={20} />
            </TouchableOpacity>
          </Header>

          {children}
        </Body>
      </Box>
    </ModalReactNative>
  );
};
export { Modal };
