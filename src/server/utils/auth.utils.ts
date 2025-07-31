import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose'
import { useRuntimeConfig } from '#imports'

export async function verifyAuthToken(token: string): Promise<JWTPayload | undefined> {
  const { domain, audience } = useRuntimeConfig().public
  if (!domain) throw new Error('AUTH0_DOMAIN no configurado')

  const issuer = `https://${domain}/`
  const jwksUri = new URL('.well-known/jwks.json', issuer)
  const JWKS = createRemoteJWKSet(jwksUri)

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer,
      audience,
    })
    return payload
  } catch (err) {
    console.error("An error ocurred veryfing JTW Token", err);
    return undefined;
  }
}
