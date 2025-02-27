export function trackEvent(eventName: string, eventData: any) {
  if (!Object.hasOwn(window, 'umami')) {
    return
  }
  // @ts-ignore
  window.umami.track(eventName, eventData)
}
