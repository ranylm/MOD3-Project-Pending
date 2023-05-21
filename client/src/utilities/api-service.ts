import { getToken } from "./user-service";

class ApiRequest {
  _url = "";
  _method = "GET";
  _mode: RequestMode = "cors";
  _cache: RequestCache = "default";
  _credentials = "same-origin";
  _headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };
  _redirect: RequestRedirect = "follow";
  _referrerPolicy: ReferrerPolicy = "no-referrer";
  _body: string | undefined = undefined;

  auth() {
    const token = getToken();
    if (token) {
      this._headers.Authorization = `Bearer ${token}`;
    }
    return this;
  }

  body(body: any) {
    this._body = JSON.stringify(body);
    return this;
  }

  async send() {
    try {
      const res = await fetch(this._url, {
        method: this._method,
        mode: this._mode,
        cache: this._cache,
        headers: this._headers,
        redirect: this._redirect,
        referrerPolicy: this._referrerPolicy,
        body: this._body,
      });
      if (res.ok) return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

class APIService {
  // url:string = "";
  // method:string = "GET";
  // mode:RequestMode = "cors";
  // cache:RequestCache ="default";
  // credentials: string ="same-origin";
  // headers:{"Content-Type":string} = {"Content-Type": "application/json"};
  // redirect:RequestRedirect = "follow";
  // referrerPolicy: ReferrerPolicy = "no-referrer";
  // body:string = "";

  get(url: string) {
    const request = new ApiRequest();
    request._method = "GET";
    request._url = url;
    return request;
  }
  put(url: string) {
    const request = new ApiRequest();
    request._method = "PUT";
    request._url = url;
    return request;
  }
  post(url: string) {
    const request = new ApiRequest();
    request._method = "POST";
    request._url = url;
    return request;
  }
  delete(url: string) {
    const request = new ApiRequest();
    request._method = "DELETE";
    request._url = url;
    return request;
  }
}

export default new APIService();
