export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;

      NameAndEmail: undefined;

      AcceptTerms: {
        name: string;
        email: string;
      };

      Choose: {
        name: string;
        email: string;
      };

      CreateAccount: {
        name: string;
        email: string;
        type: number;
      };

      ClientCode: {
        name: string;
        email: string;
        type: number;
      };

      CreatePassword: {
        name: string;
        email: string;
        client?: string;
        identification?: string;
        type: number;
        tokenCliente?: string;
        tipoCNPJCPF: number;
      };

      VerifyToken: {
        name: string;
        email: string;
        password: string;
        client: string;
        identification: string;
        type: number;
        tokenCliente?: string;
        tipoCNPJCPF: number;
      };

      TemporaryPassword: {
        email: string;
        password: string;
      };

      SendEmail: undefined;

      ValidateCode: {
        email: string;
      };

      EnterNewPassword: {
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

      ChangePassword: undefined;

      UpdateGeofences: {
        codigoGeocerca: number;
      };

      Geofences: undefined;

      CreateGeofence: undefined;

      PointsInterest: undefined;

      CreatePointsInterest: undefined;

      UpdatePointsInterest: {
        codigoPontoInteresse: number;
      };

      NotificationDetailing: {
        screen: "DetailingScreen";
        params: { codigoEvento: number };
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
