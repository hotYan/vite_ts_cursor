export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

export interface ErrorPayload {
  code?: number
  message?: string
  [key: string]: unknown
}
