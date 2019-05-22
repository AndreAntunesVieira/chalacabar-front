import BaseNormalizer from 'helpers/normalizers/_BaseNormalizer'

export default class DateNormalizer extends BaseNormalizer {
  parse(){
    return this.value
      .substr(0, 10)
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '$1/$2')
      .replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3')
      .substr(0, 10)
  }
}
