import BaseModel from 'models/_BaseModel'

export default class PartiesModel extends BaseModel {
  static defaultSelect = [
    'uid as id',
    'src',
    'src2',
    'src3',
    'titulo',
    'descricao',
    'data as date',
    'href as slug',
    'ticket_link',
    'status',
    'nomenalista',
    'tempolista',
    'attractions',
    'promos',
    'tickets',
    'highlighted_call',
    'purchasable',
  ].join(',')
  table = 'agenda'

  static image(src) {
    return src ? `https://chalacabar.com.br/img/agenda/${src}` : null
  }

  static format({
    src,
    src2,
    src3,
    purchasable,
    nomenalista,
    tempolista,
    titulo,
    descricao,
    ticket_link,
    ...party
  }) {
    return {
      ...party,
      ticketLink: ticket_link,
      title: titulo,
      description: descricao,
      listTime: tempolista,
      purchasable: !!purchasable,
      hasList: !!nomenalista,
      src: PartiesModel.image(src),
      src2: PartiesModel.image(src2),
      src3: PartiesModel.image(src3),
    }
  }

  all = () =>
    this.query(
      `Select ${
        PartiesModel.defaultSelect
      } FROM agenda WHERE DATE(data) >= DATE(NOW()) ORDER BY data ASC LIMIT 20`
    ).then(result => result.map(PartiesModel.format))

  findBySlug = slug =>
    this.querySingle(
      `SELECT ${PartiesModel.defaultSelect} FROM ${
        this.table
      } WHERE href = ? LIMIT 1`,
      slug
    ).then(PartiesModel.format)

  find = id =>
    this.querySingle(
      `SELECT ${PartiesModel.defaultSelect} FROM ${
        this.table
      } WHERE uid = ? LIMIT 1`,
      id
    )
}
