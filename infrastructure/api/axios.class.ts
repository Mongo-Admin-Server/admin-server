import axiosLibrary, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Axios {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axiosLibrary.create({
      baseURL: '/api/',
      //timeout: 10000,
      headers: {
        "X-Timezone-Offset": String( new Date().getTimezoneOffset() )
      }
    });
  }

  setBaseUrl(baseURL: string) {
    this.instance.defaults.baseURL = baseURL;
  }

  setHeader(name: string, value: string) {
    this.instance.defaults.headers.common[name] = value;
  }

  removeHeader(name: string) {
    delete this.instance.defaults.headers.common[name];
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