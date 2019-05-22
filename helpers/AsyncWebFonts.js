import delay from 'timeout-as-promise'

export const setDocumentBodyWebFontsReady = async timeout => {
  await loadFonts(timeout, 'Roboto:400,700|Montserrat:400,700')
  document.querySelector('body').classList.add('fontsReady')
}

const loadFonts = async (timeout, ...families) => {
  if (typeof WebFont === 'undefined')
    return delay(timeout).then(() => loadFonts(timeout, ...families))
  return new Promise(active => WebFont.load({ google: { families }, active }))
}
