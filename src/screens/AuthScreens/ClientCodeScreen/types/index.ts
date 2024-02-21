import { Responses } from "@typings/index";

type Params = { name: string; email: string; type: number };

type Action = {
  action?: () => void;
  response: Responses[0];
};

export { Params, Action };
