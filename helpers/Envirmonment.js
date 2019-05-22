export const isServer = typeof window === 'undefined'
export const isClient = typeof window !== 'undefined'

export const isInStandaloneMode = () => isClient &&
  ((window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone))

