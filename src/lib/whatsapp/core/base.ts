import axios, { AxiosResponse, RawAxiosResponseHeaders } from "axios";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

type LastRequestSchema = {
  method: string;
  headers: Record<string, string | null>;
  url: string;
  data?: unknown;
  body?: unknown;
};
type LastResponseSchema = {
  body?: AxiosResponse;
  headers: RawAxiosResponseHeaders;
};

const configByEnv = {
  prod: { baseUrl: "https://graph.facebook.com" },
  sandbox: { baseUrl: "" },
};

export class BaseClient {
  private config: { baseUrl: string };
  public token?: string;

  public lastRequests: LastRequestSchema[];
  public lastResponses: LastResponseSchema[];
  public lastRequest?: LastRequestSchema;
  public lastResponse?: LastResponseSchema;

  constructor(token?: string, env: "prod" | "sandbox" = "prod") {
    try {
      const validatedEnv = z.enum(["sandbox", "prod"]).parse(env);
      if (token) {
        const validatedToken = z.string().parse(token);
        this.token = validatedToken;
      }
      this.config = configByEnv[validatedEnv];

      this.lastRequests = [];
      this.lastResponses = [];
    } catch (error) {
      console.error(error);
      throw new Error("Invalid credentials");
    }
  }

  async doRequest<TBody>(
    method: string,
    url: string,
    body?: TBody,
    headers?: Record<string, string | null>,
  ) {
    headers = {
      "Content-type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : null,
      ...headers,
    };

    url = `${this.config.baseUrl}/${url}`;

    const options = {
      method: method.toUpperCase(),
      headers,
      url,
      data: body ? JSON.stringify(body) : undefined,
    };
    console.log(options);

    this.lastRequest = { ...options, data: body };
    this.lastRequests.push(this.lastRequest);

    let response;

    const { stack } = new Error();

    try {
      const res = await axios(options);
      console.log(res)

      this.lastResponse = { body: res.data, headers: res.headers };
      this.lastResponses.push(this.lastResponse);

      response = res.data;

      // eslint-disable-next-line
    } catch (ex: any) {
      ex.response = ex.response || ex.res;
      if (ex.response) {
        const { response } = ex;
        this.lastResponse = {
          body: response.data,
          headers: response.headers,
        };

        this.lastResponses.push(this.lastResponse);

        if (response.data && response.data.errors) {
          ex.message = response.data.errors
            .reduce((acc: string, curr: { description: "string" }) => {
              return acc.concat(curr.description);
            }, [])
            .join(" ");
        }
      }

      ex.stack = stack;
      throw ex;
    }

    return response;
  }
}
