export const AuthConfig = {
	callbackUrl: (host: string) => `${host}/auth/callback`,
	loginUrl: (host: string) => `${host}/auth/login`,
	accessTokenCookieKey: 'access_token',
}