export async function getJson<T>(url: string): Promise<T> {
  const response = await globalThis.fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return (await response.json()) as T
}
