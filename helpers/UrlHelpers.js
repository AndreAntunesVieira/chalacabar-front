export const isExternalUrl = url => {
  if(!url) return true
  const matchInternalUrl = url.match(/^htt(p|ps):\/\/(?!(meualu\.com|www\.meualu\.com|local\.meualu\.com|localhost))/)
  return !!matchInternalUrl
}
