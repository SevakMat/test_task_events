import { BASE_URL } from "shared/helpers/constants";

class BaseApi {
  private baseApi: string = "";
  private token: string = localStorage.getItem("token") || "";
  private additionalHeaders: any | null = null;

  constructor(
    private apiPrefix: string = "",
    private baseUrl: string = BASE_URL || "",
    private headers: any = null
  ) {
    this.baseApi = this.baseUrl + this.apiPrefix || "";
  }
  private getAuthHeader() {
    return this.headers || this.buildHeaders(this.token);
  }

  public setAdditionalHeaders(headers: any) {
    this.additionalHeaders = headers;
  }

  public buildHeaders(authToken: string = "", assocaiteToken: string = "") {
    return {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...this.additionalHeaders,
    };
  }

  private getUrl(url: string) {
    return `${this.baseApi}${url}`;
  }

  private handleResponse(res: Response) {
    return res.json();
  }

  public get(
    url: string = "",
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      headers,
    }).then(this.handleResponse);
  }

  public post(
    url: string,
    payload: any = {},
    headers: any = this.getAuthHeader(),
    isFormData: boolean = false
  ): Promise<any> {
    return fetch(url, {
      method: "POST",
      headers,
      credentials: "include",
      body: isFormData ? payload : JSON.stringify(payload),
    })
      .then(this.handleResponse)
      .catch((err) => {
        throw err;
      });
  }

  public put(
    url: string,
    payload: any,
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      method: "PUT",
      headers,
      redirect: "follow",
      cache: "no-cache",
      body: JSON.stringify(payload),
    }).then(this.handleResponse);
  }

  public delete(
    url: string,
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      headers,
    }).then(this.handleResponse);
  }
}

export default BaseApi;
