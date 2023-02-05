import React, { ReactNode } from "react";

import { Modal, ModalProps, TouchableOpacity } from "react-native";

import { Text } from "native-base";
import { AntDesign } from "@expo/vector-icons/";

import { THEME } from "@theme/theme";
import { Body, Box, Header } from "./styles";

interface ModalSelectProps extends ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  title: string;
  closeModal: () => void;
}

const ModalPeriod = ({
  isOpen,
  title,
  closeModal,
  children,
}: ModalSelectProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      hardwareAccelerated
      onRequestClose={closeModal}
    >
      <Box>
        <Body>
          <Header>
            <Text fontSize={16} color={THEME.colors.blue[700]}>{title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="close" size={20} color={THEME.colors.red[600]} />
            </TouchableOpacity>
          </Header>

          {children}
        </Body>
      </Box>
    </Modal>
  );
};
export { ModalPeriod };
