export const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()
  let from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  let to = 'aaaaaeeeeeiiiiooooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}
