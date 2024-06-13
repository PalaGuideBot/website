// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
const NO_CASE_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g]

// Remove all non-word characters.
const NO_CASE_STRIP_REGEXP = /[^A-Z0-9]+/gi

/**
 * Remove all sort of casing from the string. Copy-pasted from
 * "no-case" package with slight modifications.
 */
export function noCase(
  value: string,
  transform?: (part: string, index: number, parts: string[]) => string
): string {
  let result = NO_CASE_SPLIT_REGEXP.reduce((input, regex) => input.replace(regex, '$1\0$2'), value)
  result = result.replace(NO_CASE_STRIP_REGEXP, '\0')

  let start = 0
  let end = result.length

  // Trim the delimiter from around the output string.
  while (result.charAt(start) === '\0') {
    start++
  }
  while (result.charAt(end - 1) === '\0') {
    end--
  }

  return result
    .slice(start, end)
    .split('\0')
    .map(transform || ((input) => input.toLowerCase()))
    .join(' ')
}
