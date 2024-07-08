import ky from 'ky'

const XSRF_COOKIE_FIELD = 'XSRF-TOKEN'
const XSRF_HEADER_FIELD = 'X-XSRF-TOKEN'

export const client = ky.extend({
  prefixUrl: typeof window !== 'undefined' ? window.location.origin : undefined,
  headers: {
    Accept: 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        if (request.method.toUpperCase() === 'GET') {
          return
        }

        const cookies = parseCookies(document.cookie)

        if (XSRF_COOKIE_FIELD in cookies) {
          request.headers.set(XSRF_HEADER_FIELD, cookies[XSRF_COOKIE_FIELD])
        }
      },
    ],
  },
})

function parseCookies(cookies: string) {
  const list: Record<string, string> = {}

  cookies.split(';').forEach((cookie) => {
    const [name, value] = cookie.split('=')
    list[name.trim()] = value
  })

  return list
}
