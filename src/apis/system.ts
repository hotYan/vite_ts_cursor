import http from '@/utils/http'

interface HealthResponse {
  status: string
}

export async function getSystemHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>('/health')
}
