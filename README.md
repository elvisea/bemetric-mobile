# Windows

## Dependências

Para configurar o ambiente `Android` e `iOS` no Windows utilizando Expo Managed Workflow (Expo GO), precisamos de 5 ferramentas principais:

* Node.js v16 (LTS);
* Npm (já vem instalado com o Node);
* Git
* Expo-cli
* Expo GO (app a ser instalado no dispositivo Android e/ou iOS)


## Node.Js v16 e Npm

O primeiro passa é instalar o Node.js (LTS) e npm no nosso sistema.

Para instalar no seu sistema, você pode utilizar um gerenciador de pacotes como Chocolatey ou instalar diretamente pelo instalador .exe. Nesse guia iremos utilizar o instalador, então basta acessar o link https://nodejs.org/en/, realizar o download e seguir os passos da instalação.

Se você já tiver o Node.js instalado em sua máquina, certifique-se que sua versão é a v16.

Para verificar se a instalação foi um sucesso, basta executar os comandos abaixo:

```bash
node -v
```

```bash
npm -v
```

## Git

Para instalar no seu sistema, você pode utilizar um gerenciador de pacotes como Chocolatey ou instalar diretamente pelo instalador .exe. Nesse guia iremos utilizar o instalador, então basta acessar o link https://git-scm.com/download/win, realizar o download e seguir os passos da instalação.

Para verificar se a instalação foi um sucesso, basta executar o comando abaixo:

```bash
git --version
```

Se foi apresentado o valor da sua versão, a instalação foi um sucesso.

## Expo-Cli

Para instalar no seu sistema, você irá utilizar o seu gerenciador de pacotes npm. Abra o seu Powershell e execute o comando:

```bash
npm install -g expo-cli
```

Para verificar se a instalação foi um sucesso, basta executar o comando abaixo:

```bash
expo --version
```

Se foi apresentado o valor da sua versão, a instalação foi um sucesso.

## Expo Go

Com a CLI instalada no seu computador, você consegue criar projetos Expo e executar o metro bundler para servir o seu código, mas para executar o app no seu celular (ou emulador) você precisa instalar o aplicativo Expo GO. Ele é o responsável por pegar o código que o metro bundler envia e exibir em tela o seu app React Native.

Para instalá-lo no seu dispositivo físico, basta buscar nas lojas o aplicativo Expo Go:

* [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US)

* [Apple Store](https://apps.apple.com/br/app/expo-go/id982107779)


## Clonar Projeto

Após Ambiente configurado precisamos clonar o projeto em nossa máquina:

```bash
git clone https://sprogroup@dev.azure.com/sprogroup/B2K_BeMetrics/_git/B2K_BeMetrics_Mobile
```

Insira suas credenciais de `username` e `password` ou se preferir clone o projeto via `SSH`

Troque a branch pela `development`:

```bash
git checkout development
```

Instale as dependências do projeto:

```bash
npm -i
```

Ou instale as dependências com gerenciador de pacotes `yarn`. 

```bash
yarn
```

Obs: No projeto eu estou utilizando `yarn`. 

Para testar a aplicação qualquer um dos dois gerenciadores de pacote irá servir

Modifique o endereço de `IP` do arquivo que fica na pasta `/src/services/api.ts` pelo `IP` da sua máquina:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.3.32:8000/api",
});

export default api;
```

Obs: O endereço de `IP` deve estar no mesmo endereço onde está rodando o servidor.

Após feitas todas as configurações, na pasta raíz do projeto rode o seguinte comando:

```bash
npm start # you can also use: npx expo start
```

ou 

```bash
yarn start # you can also use: yarn expo start
```

Após ter rodado o comando em seu terminal será exibido um `QR CODE`. 

Já com o aplicativo Expo Go instalado no seu telefone `iOS` ou `Android` conecte-se à mesma rede sem fio do seu computador. 

No Android, use o aplicativo Expo Go para digitalizar o código QR do seu terminal para abrir seu projeto. 

No iOS, use o leitor de código QR integrado do aplicativo iOS Camera padrão.

Documentações oficiais 

* [React Native - Tópico - Expo Go Quickstart](https://reactnative.dev/docs/environment-setup)
* [Expo](https://docs.expo.dev/get-started/installation/)
