import { defineEventHandler, getCookie, createError } from 'h3'
import { AuthConfig } from '~/config/auth.config'
import { verifyAuthToken } from '~/server/utils/auth.utils'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AuthConfig.accessTokenCookieKey)
  if (!token) {
    // TODO: descomentar cuando el middleware este protegiendo rutas que necesitan autenticación
    // throw createError({ statusCode: 401, statusMessage: 'Token no encontrado' })

    // Para pruebas, si no hay token, no se lanza error, se loguea y continua
    console.error('TEST: Token no encontrado, continuando sin autenticación');
    return;
  }

  const payload = await verifyAuthToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Token inválido' })
  }

  event.context.user = payload
})
