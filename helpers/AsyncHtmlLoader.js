export const loadAsyncCss = href => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)
  document.body.append(link)
}

export const loadAsyncJs = src => {
  const link = document.createElement('script')
  link.setAttribute('async', '')
  link.setAttribute('defer', '')
  link.setAttribute('src', src)
  document.body.append(link)
}
