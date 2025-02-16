import { useToPng } from '@hugocxl/react-to-image'

type UseScreenshotOptions = {
  filename?: string
} & Parameters<typeof useToPng>[0]

export function useScreenshot<T = unknown>(options: UseScreenshotOptions) {
  const { filename = 'screenshot', ...rest } = options

  const [state, takeScreenshot, ref] = useToPng<T>({
    ...rest,
    onSuccess(data) {
      options.onSuccess?.(data)
      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = data
      link.click()
    },
  })

  return {
    ref,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    takeScreenshot,
  }
}
