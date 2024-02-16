export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignInScreen: undefined;

      NameAndEmailScreen: undefined;

      AcceptTermsScreen: {
        name: string;
        email: string;
      };

      ChooseScreen: {
        name: string;
        email: string;
      };

      CreateAccountScreen: {
        name: string;
        email: string;
        type: number;
      };

      ClientCodeScreen: {
        name: string;
        email: string;
        type: number;
      };

      CreatePasswordScreen: {
        name: string;
        email: string;
        client?: string;
        identification?: string;
        type: number;
        tokenCliente?: string;
        tipoCNPJCPF: number;
      };

      VerifyTokenScreen: {
        name: string;
        email: string;
        password: string;
        client: string;
        identification: string;
        type: number;
        tokenCliente?: string;
        tipoCNPJCPF: number;
      };

      TemporaryPasswordScreen: {
        email: string;
        password: string;
      };

      SendEmailScreen: undefined;

      ValidateCodeScreen: {
        email: string;
      };

      EnterNewPasswordScreen: {
        email: string;
        codigoAtivacao: string;
      };

      Equipments: undefined;

      DetalhesEquipamento: undefined;

      EquipmentDetails: {
        screen: "Equipament";
        params: { codigoEquipamento: number };
      };

      TelemetryData: {
        screen: "TelemetryData";
        params: { codigoEquipamento: number };
      };

      Chart: {
        url: string;
        dataDe: string;
        dataAte: string;
        usaData: boolean;
        tipoIntervalo: number;
        codigoEquipamento: number;
      };

      TelemetryDevice: {
        screen: "TelemetryDevice";
        params: { codigoEquipamento: number };
      };

      VincularDispositivo: {
        id?: string;
        chave?: string;
        serial: string;
      };

      ConfigurarConexaoBluetooth: undefined;

      IncludeStackRoutes: {
        screen: string;
        params?: {
          chave?: string;
          serial?: string;
          network?: string | undefined;
        };
      };

      Equipamentos: undefined;

      EquipamentoTabRoutes: undefined;

      Notifications: undefined;
      Messages: undefined;
      MessageDetails: {
        tipoMensagem: number;
        codigoMensagem: number;
      };

      EquipamentosDisponiveis: {
        chave: string;
      };

      ConfigurarConexaoDados: {
        chave: string;
      };

      ListaRedes: {
        chave: string;
      };

      ConexaoRedesMoveis: {
        chave: string;
      };

      ConexaoManual: {
        chave: string;
        nomeRede?: string;
      };

      ChooseGrouping: undefined;

      AddEquipment: {
        chave: string;
        serial: string;
      };

      SyncDataStackRoutes: {
        screen: "ExportarDados" | "ColetarDados" | "SincronizarDados";
      };

      AddGrouping: undefined;

      ChangePasswordScreen: undefined;

      Geofences: undefined;
      CreateGeofence: undefined;
      Geofence: { codigoGeocerca: number };

      Points: undefined;
      CreatePoint: undefined;
      Point: { codigoPontoInteresse: number };

      NotificationDetailing: {
        screen: "DetailingScreen";
        params: {
          codigoEvento: number;
          codigoEquipamento: number;
          codigoDispositivo: number;
        };
      };

      // Pra Cima OK

      Clients: undefined;
      Password: undefined;
      VincularCliente: undefined;
      AtivarCodigo: undefined;
      EquipamentosScreen: undefined;

      HomePage: undefined;
    }
  }
}
