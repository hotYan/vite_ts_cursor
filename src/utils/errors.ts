export const ErrorCode = {
  Success: 0,
  Unauthorized: 40101,
  Forbidden: 40301,
  ServerError: 50000,
  NetworkError: -1,
  Unknown: -9999,
} as const

export class BusinessError extends Error {
  code: number
  details?: unknown

  constructor(code: number, message: string, details?: unknown) {
    super(message)
    this.name = 'BusinessError'
    this.code = code
    this.details = details
  }
}

export const isBusinessError = (error: unknown): error is BusinessError =>
  error instanceof BusinessError

export const getErrorMessage = (error: unknown): string => {
  if (isBusinessError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return '未知异常，请稍后重试'
}
