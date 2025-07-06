import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose'
import { useRuntimeConfig } from '#imports'

export async function verifyAuthToken(token: string): Promise<JWTPayload> {
  const { domain, audience } = useRuntimeConfig().public
  if (!domain) throw new Error('AUTH0_DOMAIN no configurado')
  
  const issuer = `https://${domain}/`
  const jwksUri = new URL('.well-known/jwks.json', issuer)
  const JWKS = createRemoteJWKSet(jwksUri)

  const { payload } = await jwtVerify(token, JWKS, {
    issuer,
    audience,
  })

  return payload
}
