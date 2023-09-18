import axiosLibrary, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Axios {
  private instance: AxiosInstance;
  private accessToken: string|null = null;

  constructor() {
    const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

    this.instance = axiosLibrary.create({
      baseURL: `${SERVER_ENDPOINT}/api`,
      //timeout: 10000,
      headers: {
        "X-Timezone-Offset": String( new Date().getTimezoneOffset() )
      }
    });
  }

  setBaseUrl(baseURL: string) {
    this.instance.defaults.baseURL = baseURL;
  }

  setAuthorization = (accessToken: string|null) => {
    if (accessToken) this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    else delete this.instance.defaults.headers.common.Authorization
    this.accessToken = accessToken
  }

  setFilter = (filter: any) => {
    this.instance.defaults.headers.common.Filter = filter
  }

  deleteFilter = () => {
    delete this.instance.defaults.headers.common.Filter
  }

  async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }

  async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put(url, data, config);
  }

  async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete(url, config);
  }

  async patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.patch(url, data, config);
  }
}

export const axios = new Axios();