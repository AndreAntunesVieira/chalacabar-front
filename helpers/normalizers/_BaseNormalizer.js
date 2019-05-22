export default class BaseNormalizer {
  constructor(element) {
    this._element = element
    if(typeof this.parse !== 'function') throw new Error('A normalizer should have a method called parse')
  }

  get value(){
    return this._element.value
  }

  normalize = () => {
    if (!this._element.value) return this._element.value
    const value = this.parse()
    if (value === this._element.value) return value
    return (this._element.value = value)
  }
}
