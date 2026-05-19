import http from '@/utils/http'

interface HealthResponse {
  status: string
}

interface LoginData {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

interface UserInfo {
  username: string
  avatar?: string
  roles?: string[]
}

export async function getSystemHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>('/health')
}

export async function logout(): Promise<void> {
  return http.post('/web/auth/logout')
}

export async function getSalt(username: string): Promise<HealthResponse> {
  return http.post<HealthResponse>('/web/auth/salt', undefined, { params: { username } })
}

export async function postLogin(data: LoginData): Promise<LoginResponse> {
  return http.post<LoginResponse>('/login', data, { withCredentials: true })
}

export async function getUserInfo(): Promise<UserInfo> {
  return http.get<UserInfo>('/user')
}

interface CaptchaResponse {
  captchaId: string
  data: string
}

export async function getAuthCode(): Promise<CaptchaResponse> {
  return http.post<CaptchaResponse>('/captcha')
}
// export async function getAuthCode(): Promise<CaptchaResponse> {
//   return http.postBlob<CaptchaResponse>('/captcha')
// }
