import BaseModel from 'models/_BaseModel'

export default class TextsModel extends BaseModel {
  all = () => {
    return this.query("SELECT name, descricao as description, value FROM textos_e_imagens WHERE type = 'txt'").catch(
      () => Promise.reject('text_not_found')
    )
  }

  find = slug => {
    return this.querySingle(
      "SELECT name, descricao as description, value FROM textos_e_imagens WHERE type = 'txt' AND name = ?",
      [slug]
    ).catch(() => Promise.reject('text_not_found'))
  }
}
