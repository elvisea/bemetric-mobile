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

      IncludeStackRoutes: {
        screen: string;
      };

      Equipamentos: undefined;

      EquipamentoTabRoutes: undefined;

      Notifications: undefined;
      Messages: undefined;
      MessageDetails: {
        tipoMensagem: number;
        codigoMensagem: number;
      };

      Manual: {
        id: string;
        serial: string;
      };
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
