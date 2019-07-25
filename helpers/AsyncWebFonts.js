import delay from 'timeout-as-promise'

export const setDocumentBodyWebFontsReady = timeout => {
  return loadFonts(timeout, 'Allerta+Stencil:400,700', 'Roboto:400,700')
}

const loadFonts = (timeout, ...families) => {
  if (typeof WebFont === 'undefined')
    return delay(timeout).then(() => loadFonts(timeout, ...families))
  return new Promise(active =>
    WebFont.load({
      google: { families },
      active: () => {
        document.querySelector('body').classList.add('fontsReady')
        active()
      },
    })
  )
}
