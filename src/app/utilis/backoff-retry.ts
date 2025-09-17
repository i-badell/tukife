export async function backoffRetry<T>(fn: () => Promise<T>, tries = 4) {
  let attempt = 0, lastErr
  while (attempt < tries) {
    try { return await fn() } catch (e) {
      lastErr = e
      const delay = Math.min(1600, 100 * Math.pow(4, attempt)) // 100ms → 1600ms
      await new Promise(r => setTimeout(r, delay))
      attempt++
    }
  }
  throw lastErr
}