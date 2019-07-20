import BaseModel from 'api/models/_BaseModel'
import { slugify } from 'api/helpers/StringHelpers'

export default class SponsorsModel extends BaseModel {
  find = (name, pass) => {
    return this.querySingle(
      'SELECT id, name, email, phone FROM promoters WHERE slug = ? AND password = ?',
      [slugify(name), pass]
    ).catch(() => Promise.reject('promoter_not_found'))
  }
}
