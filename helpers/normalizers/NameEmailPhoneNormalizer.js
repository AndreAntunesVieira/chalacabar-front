import BaseNormalizer from 'helpers/normalizers/_BaseNormalizer'

export default class NameEmailPhoneNormalizer extends BaseNormalizer {
  phone = () => {
    this.value
      .substr(0, 15)
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .substr(0, 15)
  }

  parse(){
    if(this.value.match(/(\d|\(\d)/)) return this.phone()
    return this.value
  }
}
