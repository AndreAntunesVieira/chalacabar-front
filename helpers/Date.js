export const brDate = date => {
  if(typeof date !== 'string') return date
  return date.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')
}
