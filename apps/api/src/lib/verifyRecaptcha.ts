type SiteverifyResponse = {
  success?: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

export type VerifyRecaptchaResult =
  | { ok: true; score: number }
  | { ok: false; reason: string }

export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string,
): Promise<VerifyRecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true, score: 1 }
  if (!token) return { ok: false, reason: 'Missing captcha token' }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5')

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    })
    const data = (await res.json()) as SiteverifyResponse

    if (!data.success) {
      return { ok: false, reason: `siteverify failed: ${(data['error-codes'] ?? []).join(',') || 'unknown'}` }
    }
    if (data.action && data.action !== expectedAction) {
      return { ok: false, reason: `action mismatch: got ${data.action}, expected ${expectedAction}` }
    }
    const score = typeof data.score === 'number' ? data.score : 0
    if (score < minScore) {
      return { ok: false, reason: `score ${score} below threshold ${minScore}` }
    }
    return { ok: true, score }
  } catch (err) {
    return { ok: false, reason: `siteverify error: ${(err as Error).message}` }
  }
}
