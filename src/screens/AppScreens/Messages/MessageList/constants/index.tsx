import { MaterialCommunityIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Responses } from "@typings/index";

import SystemRead from "@assets/system-read.svg";
import SystemUnread from "@assets/system-unread.svg";

import AdminRead from "@assets/admin-read.svg";
import AdminUnread from "@assets/admin-unread.svg";

import { State, Types } from "../types";

const types: Types = {
  0: {
    read: {
      color: THEME.colors.gray[350],
      icon: <AdminRead />,
    },
    unread: {
      color: THEME.colors.blue[700],
      icon: <AdminUnread />,
    },
  },
  1: {
    read: {
      color: THEME.colors.gray[350],
      icon: (
        <MaterialCommunityIcons
          name="email-open-multiple-outline"
          size={29}
          color={THEME.colors.white}
        />
      ),
    },
    unread: {
      color: THEME.colors.orange[100],
      icon: (
        <MaterialCommunityIcons
          name="email-multiple-outline"
          size={29}
          color={THEME.colors.white}
        />
      ),
    },
  },
  2: {
    read: {
      icon: <SystemRead />,
      color: THEME.colors.gray[350],
    },
    unread: {
      icon: <SystemUnread />,
      color: THEME.colors.cyan[100],
    },
  },
};

const responses: Responses = {
  0: {
    title: "Exclusão Concluída",
    subtitle: "A mensagem foi excluída com sucesso.",
  },
  1: {
    title: "Falha na Exclusão",
    subtitle:
      "Não foi possível excluir a mensagem. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.",
  },
};

const initialState: State = {
  types,
  messages: [],
  responses,
  isLoading: false,
};

export { initialState };
