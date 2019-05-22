import BaseModel from './_BaseModel'

export default class TextsModel extends BaseModel {
  route = 'texts'

  find = route => this.get({ route })
}
