import BaseNormalizer from 'helpers/normalizers/_BaseNormalizer'

export default class DateNormalizer extends BaseNormalizer {
  parse() {
    return this.value
      .substr(0, 13)
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{1,3})$/, '$1.$2')
      .replace(/^(\d{2})(\d{3})(\d{1,3})$/, '$1.$2.$3')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4')
      .substr(0, 13)
  }
}
