enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method?: METHODS;
  data?: any;
  contentType?: string;
}

export default class HTTPTransport {
  static DEFAULT_URL = 'https://ya-praktikum.tech/api/v2';

  protected url: string;

  constructor(path: string) {
    this.url = `${HTTPTransport.DEFAULT_URL}${path}`;
  }

  public get<Response>(path = '/', data?: unknown): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.GET,
      data,
    });
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.POST,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown, contentType?: string): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.PUT,
      data,
      contentType,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.PATCH,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.DELETE,
      data,
    });
  }

  private request<Response>(url: string, options: Options = { method: METHODS.GET }): Promise<Response> {
    const { method, data, contentType } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method || '', url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!contentType) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      } else {
        xhr.setRequestHeader('Content-Type', contentType);
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
