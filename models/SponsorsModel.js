import BaseModel from 'models/_BaseModel'

export default class SponsorsModel extends BaseModel {
  static defaultSelect = ['src', 'link', 'titulo'].join(',')

  all = () => this.query('Select * from apoio WHERE active = ?', 1)
}
