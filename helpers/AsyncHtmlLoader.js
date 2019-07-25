export const loadAsyncCss = href => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)
  document.body.append(link)
}
