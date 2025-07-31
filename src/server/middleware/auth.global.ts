import { defineEventHandler, getCookie, createError } from 'h3'
import { AuthConfig } from '~/config/auth.config'
import { verifyAuthToken } from '~/server/utils/auth.utils'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AuthConfig.accessTokenCookieKey)
  if (!token) {
    console.log('token not found');
    return;
  }

  const payload = await verifyAuthToken(token)
  if (!payload) {
    deleteCookie(event, AuthConfig.accessTokenCookieKey);
    return;
  }

  event.context.user = payload
})
