import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import type { ApiResult, ErrorPayload } from '@/types/common'
import { BusinessError, ErrorCode } from '@/utils/errors'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

const isApiResult = <T>(data: unknown): data is ApiResult<T> => {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  const payload = data as Record<string, unknown>
  return 'code' in payload && 'message' in payload && 'data' in payload
}

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => {
    const payload = response.data
    if (isApiResult(payload)) {
      if (payload.code !== ErrorCode.Success) {
        throw new BusinessError(payload.code, payload.message || '业务处理失败', payload)
      }
      return payload.data
    }
    return payload
  },
  (error) => {
    const axiosError = error as AxiosError<ErrorPayload>
    const status = axiosError.response?.status
    if (status === 401) {
      localStorage.removeItem('token')
      return Promise.reject(new BusinessError(ErrorCode.Unauthorized, '登录状态已失效，请重新登录'))
    }
    if (status === 403) {
      return Promise.reject(new BusinessError(ErrorCode.Forbidden, '当前账号无权限执行该操作'))
    }
    if (status && status >= 500) {
      return Promise.reject(new BusinessError(ErrorCode.ServerError, '服务暂时不可用，请稍后重试'))
    }
    if (axiosError.code === 'ERR_NETWORK') {
      return Promise.reject(new BusinessError(ErrorCode.NetworkError, '网络异常，请检查网络连接'))
    }

    const backendCode = axiosError.response?.data?.code
    const backendMessage = axiosError.response?.data?.message
    if (typeof backendCode === 'number' && typeof backendMessage === 'string') {
      return Promise.reject(new BusinessError(backendCode, backendMessage, axiosError.response?.data))
    }

    return Promise.reject(new BusinessError(ErrorCode.Unknown, '请求失败，请稍后重试', axiosError))
  },
)

const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return httpClient.get<T, T>(url, config)
  },
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return httpClient.post<T, T>(url, data, config)
  },
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return httpClient.put<T, T>(url, data, config)
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return httpClient.delete<T, T>(url, config)
  },
}

export default http
