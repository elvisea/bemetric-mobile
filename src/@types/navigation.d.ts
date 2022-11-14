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
      };

      ClientCode: {
        name: string;
        email: string;
      };

      CreatePassword: {
        name: string;
        email: string;
        client: string;
        identification: string;
      };

      VerifyToken: {
        name: string;
        email: string;
        password: string;
        client: string;
        identification: string;
      };

      // Pra Cima OK

      Clients: undefined;
      Password: undefined;
      VincularCliente: undefined;
      AtivarCodigo: undefined;
      // Equipamentos: undefined;
      EquipamentoTabRoutes: {
        screen: string;
      };
    }
  }
}
