import React, { useState } from "react";

import { IconButton, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "@assets/b2k.svg";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { GenericModal } from "@components/GenericModal";
import { PeriodOption } from "@components/PeriodOption";

import { Icon } from "./styles";

type Props = {
  hasIcon?: boolean;
};

type Screen = "ExportarDados" | "ColetarDados" | "SincronizarDados";

type IOption = {
  id: number;
  title: string;
  screen: Screen;
};

const options: IOption[] = [
  { screen: "ExportarDados", title: "Exportar Dados", id: 0 },
  { screen: "ColetarDados", title: "Coletar Dados", id: 1 },
  { screen: "SincronizarDados", title: "Sincronizar Dados", id: 2 },
];

export function Cabecalho({ hasIcon = true }: Props) {
  const navigation = useNavigation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optionSelected, setOptionSelected] = useState<IOption>({} as IOption);

  const handleNextpage = () => {
    setIsOpenModal(false);
    setOptionSelected({} as IOption);
    navigation.navigate("SyncDataStackRoutes", {
      screen: optionSelected.screen,
    });
  };

  return (
    <>
      <GenericModal
        title="Gerenciar Dados"
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
      >
        {options.map((option) => (
          <PeriodOption
            key={option.id}
            title={option.title}
            isActive={optionSelected.id === option.id}
            onPress={() => setOptionSelected(option)}
          />
        ))}

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Navegar"
          width="100%"
          onPress={handleNextpage}
        />
      </GenericModal>

      <HStack
        w="full"
        h={`${RFValue(82)} px`}
        bg={THEME.colors.blue[700]}
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          icon={<Icon name="arrow-back" />}
          onPress={() => navigation.goBack()}
        />

        {/* <Logo /> */}

        {hasIcon && (
          <IconButton
            icon={<Icon name="settings" />}
            onPress={() => setIsOpenModal(true)}
          />
        )}
      </HStack>
    </>
  );
}
