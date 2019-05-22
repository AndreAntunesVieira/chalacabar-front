import BaseNormalizer from 'helpers/normalizers/_BaseNormalizer'

export default class PhoneNormalizer extends BaseNormalizer {
  parse(){
    return this.value
      .substr(0, 15)
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .substr(0, 15)
  }
}
