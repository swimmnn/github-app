export type TQuery = Record<string, string | number | boolean>;

interface IFetchPayload<Body, ExtraParams> {
  body?: Body;
  params?: any;
  extraParams?: ExtraParams;
}

interface IFetchData<Body, ExtraParams> extends IFetchPayload<Body, ExtraParams> {
  method?: string;
}

export type TApiConfigHeadersProps = any;

export interface IApiConfigProps {
  headers?: TApiConfigHeadersProps;
}

interface IApiHandleProps<ExtraParams> {
  beforeRequestHandle?: (updateHeader: Function, url: string, data: ExtraParams) => void;
  handleErrors?: (error: any) => void;
}

interface IApiExtraConfig {
  mode: RequestMode;
}

export interface IApiProps<ExtraParams> {
  baseUrl: string;
  config?: IApiConfigProps;
  handlers?: IApiHandleProps<ExtraParams>;
  extraConfig?: IApiExtraConfig;
}

export interface IApiConfigReturn<ExtraParams> {
  baseUrl: string;
  config?: IApiConfigProps;
  handlers?: IApiHandleProps<ExtraParams>;

  get<Response> (url: string, query?: TQuery): Promise<Response>;

  post<Body, Response> (url: string, body?: Body, query?: TQuery): Promise<Response>;

  put<Body, Response> (url: string, body?: Body): Promise<Response>;

  patch<Body, Response> (url: string, body?: Body): Promise<Response>;

  delete<Body, Response> (url: string, body?: Body): Promise<Response>;

  updateConfig (configProps: IApiConfigProps): Promise<void>;
}

export class ApiConfig<ExtraParams = Record<string, any>> implements IApiConfigReturn<ExtraParams> {
  baseUrl = "";
  config = {headers: {}};
  handlers: any;
  extraConfig = {mode: "cors"};

  constructor ({
    baseUrl,
    config,
    handlers,
    extraConfig
  }: IApiProps<ExtraParams>) {

    this.baseUrl = baseUrl;
    this.config = {
      ...this.config,
      ...config
    };
    this.handlers = handlers;
    this.extraConfig = extraConfig || {mode: "cors"};
  }

  get = <Response> (url: string, payload?: IFetchPayload<any, ExtraParams>): Promise<Response> => {
    return this.fetch(url, {
      method: "GET",
      ...payload
    });
  };

  post = <Body, Response> (url: string, payload?: IFetchPayload<Body, ExtraParams>): Promise<Response> => {
    return this.fetch(url, {
      method: "POST",
      ...payload
    });
  };

  put = <Body, Response> (url: string, payload?: IFetchPayload<Body, ExtraParams>): Promise<Response> => {
    return this.fetch(url, {
      method: "PUT",
      ...payload
    });
  };

  patch = <Body, Response> (url: string, payload?: IFetchPayload<Body, ExtraParams>): Promise<Response> => {
    return this.fetch(url, {
      method: "PATCH",
      ...payload
    });
  };

  delete = <Body, Response> (url: string, payload?: IFetchPayload<Body, ExtraParams>): Promise<Response> => {
    return this.fetch(url, {
      method: "DELETE",
      ...payload
    });
  };

  updateConfig = async (configProps: IApiConfigProps): Promise<void> => {
    this.config = {
      ...this.config,
      ...configProps
    };
  };

  private fetch = async (url: string, data: IFetchData<any, any>): Promise<any> => {
    try {
      if (this.handlers?.beforeRequestHandle) {
        await this.handlers?.beforeRequestHandle(await this.updateConfig, url, data);
      }

      let headers = this.config.headers;
      let body;

      if (data.body instanceof FormData) {
        body = data.body;
        delete headers["Content-Type"];
      } else {
        body = JSON.stringify(data.body);
      }

      return fetch(this.baseUrl + url + this.createQueryParams(data.params), {
        mode: (this.extraConfig.mode || "cors") as RequestMode,
        cache: "default",
        method: data.method,
        body,
        headers
      }).then(this.handleBody)
        .then((json: any) => json)
        .catch((err: any) => {
          if ("json" in err) {
            return err.json.then((errorJson: { message: any, type: string }): { message: any, type: string, status: number } | undefined => {
              throw {...errorJson, status: err.status};
            }).catch((e: any) => {
              throw {...e, status: err.status};
            });
          } else {
            throw new Error("Server error");
          }
        });
    } catch (err) {
      throw err;
    }
  };

  private handleBody = (body: Response) => {
    let contentType = body.headers.get("content-type");

    if (!body.ok) {
      throw {json: body.json(), status: body.status};
    }

    if (contentType && contentType.indexOf("application/json") !== -1) {
      return body.json();
    } else {
      return body.text();
    }
  };


  /**
   * @param query
   */
  private createQueryParams = (query?: TQuery): string => {
    if (query) {
      let result = "?";
      Object.keys(query).forEach((key: string) => {
        if (query[key]) {
          result += `${key}=${query[key]}&`;
        }
      });
      return result.slice(0, -1);
    }

    return "";
  };
}
