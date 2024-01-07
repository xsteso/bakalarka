// @ts-nocheck
/*
    Phishing Game API generated
    
    version: v1
*/

export class Configuration {
  basePath? = "";
  fetchMethod = window.fetch;
  headers?: any = {};
  getHeaders: any = () => {
    return {};
  };
  responseHandler: any = null;
  errorHandler: any = null;

  constructor(config: Configuration | any) {
    if (config) {
      if (config.basePath) {
        this.basePath = config.basePath;
      }
      if (config.fetchMethod) {
        this.fetchMethod = config.fetchMethod;
      }
      if (config.headers) {
        this.headers = config.headers;
      }
      if (config.getHeaders) {
        this.getHeaders = config.getHeaders;
      }
      if (config.responseHandler) {
        this.responseHandler = config.responseHandler;
      }
      if (config.errorHandler) {
        this.errorHandler = config.errorHandler;
      }
    }
  }
}

const setAdditionalParams = (params = [], additionalParams = {}) => {
  Object.keys(additionalParams).forEach((key) => {
    if (additionalParams[key]) {
      params.append(key, additionalParams[key]);
    }
  });
};

export class Login {
  username?: string;
  password?: string;

  constructor(obj: Login) {
    this.username = obj.username;
    this.password = obj.password;
  }
}

export class Register {
  id?: number;
  username?: string;
  password?: string;

  constructor(obj: Register) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
  }
}

export class User {
  id?: number;
  username?: string;

  constructor(obj: User) {
    this.id = obj.id;
    this.username = obj.username;
  }
}

export class EmailGameRun {
  id?: number;
  email?: number;
  game_run?: number;
  order?: number;
  player_answer?: any;
  duration?: number;

  constructor(obj: EmailGameRun) {
    this.id = obj.id;
    this.email = obj.email;
    this.game_run = obj.game_run;
    this.order = obj.order;
    this.player_answer = obj.player_answer;
    this.duration = obj.duration;
  }
}

export class Email {
  id?: number;
  enabled?: boolean;
  subject?: string;
  sender?: string;
  reply_to?: string;
  recipient?: string;
  date?: string;
  cc?: string;
  body?: string;
  type?: any;
  sign?: any[];
  gameruns?: any[];

  constructor(obj: Email) {
    this.id = obj.id;
    this.subject = obj.subject;
    this.sender = obj.sender;
    this.reply_to = obj.reply_to;
    this.recipient = obj.recipient;
    this.date = obj.date;
    this.cc = obj.cc;
    this.body = obj.body;
    this.type = obj.type;
    this.sign = obj.sign;
    this.gameruns = obj.gameruns;
  }
}

export class GameRun {
  id?: number;
  player_name?: string;
  player_age?: number;
  player_gender?: string;
  emails?: any[];
  start_time?: string;
  end_time?: string;

  constructor(obj: GameRun) {
    this.id = obj.id;
    this.player_name = obj.player_name;
    this.player_age = obj.player_age;
    this.player_gender = obj.player_gender;
    this.emails = obj.emails;
    this.start_time = obj.start_time;
    this.end_time = obj.end_time;
  }
}

export class Setting {
  id?: number;
  key?: string;
  value?: string;
  type?: string;
  translated_text?: string;

  constructor(obj: Setting) {
    this.id = obj.id;
    this.key = obj.key;
    this.value = obj.value;
    this.type = obj.type;
    this.translated_text = obj.translated_text;
  }
}

export class SettingsTranslation {
  id?: number;
  setting?: number;
  text_translation?: string;

  constructor(obj: SettingsTranslation) {
    this.id = obj.id;
    this.setting = obj.setting;
    this.text_translation = obj.text_translation;
  }
}

export class Sign {
  id?: number;
  text?: string;

  constructor(obj: Sign) {
    this.id = obj.id;
    this.text = obj.text;
  }
}

export class Type {
  id?: number;
  type?: string;

  constructor(obj: Type) {
    this.id = obj.id;
    this.type = obj.type;
  }
}

export class MethodOptions {
  headers?: any = {};
  returnResponse?: boolean = false;

  constructor(options: MethodOptions) {
    if (options.headers) {
      this.headers = options.headers;
    }
    if (options.returnResponse) {
      this.returnResponse = options.returnResponse;
    }
  }
}

export class AuthLoginPostArgs {
  data: Login;

  constructor(args: AuthLoginPostArgs) {
    this.data = args.data;
  }
}

export class AuthRegisterPostArgs {
  data: Register;

  constructor(args: AuthRegisterPostArgs) {
    this.data = args.data;
  }
}

export class EmailsPostArgs {
  data: Email;

  constructor(args: EmailsPostArgs) {
    this.data = args.data;
  }
}

export class EmailsIdPutArgs {
  data: Email;

  constructor(args: EmailsIdPutArgs) {
    this.data = args.data;
  }
}

export class EmailsIdPatchArgs {
  data: Email;

  constructor(args: EmailsIdPatchArgs) {
    this.data = args.data;
  }
}

export class SettingsPostArgs {
  data: Setting;

  constructor(args: SettingsPostArgs) {
    this.data = args.data;
  }
}

export class SettingsTranslationsPostArgs {
  data: SettingsTranslation;

  constructor(args: SettingsTranslationsPostArgs) {
    this.data = args.data;
  }
}

export class SettingsTranslationsIdPutArgs {
  data: SettingsTranslation;

  constructor(args: SettingsTranslationsIdPutArgs) {
    this.data = args.data;
  }
}

export class SettingsTranslationsIdPatchArgs {
  data: SettingsTranslation;

  constructor(args: SettingsTranslationsIdPatchArgs) {
    this.data = args.data;
  }
}

export class SettingsIdPutArgs {
  data: Setting;

  constructor(args: SettingsIdPutArgs) {
    this.data = args.data;
  }
}

export class SettingsIdPatchArgs {
  data: Setting;

  constructor(args: SettingsIdPatchArgs) {
    this.data = args.data;
  }
}

export class SignsPostArgs {
  data: Sign;

  constructor(args: SignsPostArgs) {
    this.data = args.data;
  }
}

export class SignsIdPutArgs {
  data: Sign;

  constructor(args: SignsIdPutArgs) {
    this.data = args.data;
  }
}

export class SignsIdPatchArgs {
  data: Sign;

  constructor(args: SignsIdPatchArgs) {
    this.data = args.data;
  }
}

export class TypesPostArgs {
  data: Type;

  constructor(args: TypesPostArgs) {
    this.data = args.data;
  }
}

export class TypesIdPutArgs {
  data: Type;

  constructor(args: TypesIdPutArgs) {
    this.data = args.data;
  }
}

export class TypesIdPatchArgs {
  data: Type;

  constructor(args: TypesIdPatchArgs) {
    this.data = args.data;
  }
}

export class AuthApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  authLoginPost(
    args: AuthLoginPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/login/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authLogoutPost(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/logout/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authRegisterPost(
    args: AuthRegisterPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/register/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authUserGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/user/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class Api {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  authLoginParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/login/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authLogoutParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/logout/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authRegisterParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/register/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  authUserParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/auth/user/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  egrunsParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/egruns/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  egrunsIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/egruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsImportParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/import/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsEmailIdStatisticsParameters(
    options: MethodOptions | any = {}
  ): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{email_id}/statistics/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunInitParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/init/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunNextEmailParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/nextEmail/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunSetAnswerParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/setAnswer/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunSummaryParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/summary/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsGamerunIdEmailsParameters(
    options: MethodOptions | any = {}
  ): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/{gamerun_id}/emails/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsParameters(
    options: MethodOptions | any = {}
  ): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsIdParameters(
    options: MethodOptions | any = {}
  ): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesIdParameters(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "parameters",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class EgrunsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  egrunsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/egruns/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  egrunsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/egruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  egrunsIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/egruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class EmailsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  emailsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsPost(
    args: EmailsPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsImportPost(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/import/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsEmailIdStatisticsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{email_id}/statistics/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsIdPut(
    args: EmailsIdPutArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsIdPatch(
    args: EmailsIdPatchArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  emailsIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/emails/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class GamerunApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  gamerunInitPost(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/init/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunNextEmailGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/nextEmail/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunSetAnswerPost(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/setAnswer/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunSummaryGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gamerun/summary/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class GamerunsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  gamerunsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsGamerunIdEmailsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/{gamerun_id}/emails/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  gamerunsIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/gameruns/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class SettingsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  settingsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsPost(
    args: SettingsPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsPost(
    args: SettingsTranslationsPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsIdPut(
    args: SettingsTranslationsIdPutArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsIdPatch(
    args: SettingsTranslationsIdPatchArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsTranslationsIdDelete(
    options: MethodOptions | any = {}
  ): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/translations/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsIdPut(
    args: SettingsIdPutArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsIdPatch(
    args: SettingsIdPatchArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  settingsIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/settings/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class SignsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  signsGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsPost(
    args: SignsPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsIdPut(
    args: SignsIdPutArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsIdPatch(
    args: SignsIdPatchArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  signsIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/signs/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}

export class TypesApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  typesGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesPost(
    args: TypesPostArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesIdGet(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesIdPut(
    args: TypesIdPutArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesIdPatch(
    args: TypesIdPatchArgs,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { data } = args;
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof data ? JSON.stringify(data) : data,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  typesIdDelete(options: MethodOptions | any = {}): Promise<any> {
    const {
      fetchMethod,
      basePath,
      headers,
      getHeaders,
      responseHandler,
      errorHandler,
    } = this.config;
    const url = "/types/{id}/";
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "delete",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}
