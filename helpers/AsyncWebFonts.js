import delay from 'timeout-as-promise'

export const setDocumentBodyWebFontsReady = timeout => {
  return loadFonts(timeout, 'Roboto:400,700|Montserrat:400,700').then(() => {
    document.querySelector('body').classList.add('fontsReady')
  })
}

const loadFonts = (timeout, ...families) => {
  if (typeof WebFont === 'undefined')
    return delay(timeout).then(() => loadFonts(timeout, ...families))
  return new Promise(active => WebFont.load({ google: { families }, active }))
}
