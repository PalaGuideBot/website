import { router, usePage } from '@inertiajs/react'
import * as React from 'react'

type URLSearchParamsInit =
  string | [string, string][] | Record<string, string | string[]> | URLSearchParams

type SetURLSearchParams = (
  nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: Parameters<typeof router.visit>[1]
) => void

function createSearchParams(init: URLSearchParamsInit = ''): URLSearchParams {
  return new URLSearchParams(
    typeof init === 'string' || Array.isArray(init) || init instanceof URLSearchParams
      ? init
      : Object.keys(init).reduce(
          (memo, key) => {
            let value = init[key]
            return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]])
          },
          [] as [string, string][]
        )
  )
}

export function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams] {
  let defaultSearchParamsRef = React.useRef(createSearchParams(defaultInit))
  let hasSetSearchParamsRef = React.useRef(false)

  let page = usePage()
  let searchParams = React.useMemo(
    () =>
      getSearchParamsForLocation(
        extractQueryString(page.url),
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      ),
    [page.url]
  )
  let setSearchParams = React.useCallback<SetURLSearchParams>(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === 'function' ? nextInit(searchParams) : nextInit
      )
      hasSetSearchParamsRef.current = true
      router.visit('?' + newSearchParams, navigateOptions)
    },
    [router, searchParams]
  )

  return [searchParams, setSearchParams]
}

function getSearchParamsForLocation(
  locationSearch: string,
  defaultSearchParams: URLSearchParams | null
) {
  let searchParams = createSearchParams(locationSearch)

  if (defaultSearchParams) {
    // Use `defaultSearchParams.forEach(...)` here instead of iterating of
    // `defaultSearchParams.keys()` to work-around a bug in Firefox related to
    // web extensions. Relevant Bugzilla tickets:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1414602
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1023984
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value)
        })
      }
    })
  }

  return searchParams
}

function extractQueryString(url: string): string {
  let queryIndex = url.indexOf('?')
  return queryIndex === -1 ? '' : url.slice(queryIndex)
}
