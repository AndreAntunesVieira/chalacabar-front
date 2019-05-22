import { isClient } from 'helpers/Envirmonment'

export const getResolutionImageUrl = (mobile, desk) => {
  if(isClient) return window.matchMedia('(min-width: 1012px)').matches ? desk : mobile
  return desk
}
