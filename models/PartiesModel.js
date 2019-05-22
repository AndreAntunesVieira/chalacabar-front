import 'isomorphic-unfetch'
import BaseModel from './_BaseModel'

export default class PartiesModel extends BaseModel {
  route = 'parties'
  all() {
    return this.get()
      .then(parties => parties.map(parse))
  }
  scheduled() {
    return this.get()
      .then(parties => parties.filter(party => party.src3))
  }
  find(slug) {
    return this.get({ route: slug }).then(parse)
  }
}


const parse = party => ({
  ...party,
  src3: party.src3 ? party.src3 : 'https://chalacabar.com.br/img/agenda/default-src.jpeg',
  src2: party.src2 ? party.src2 : 'https://chalacabar.com.br/img/agenda/default-src3.jpeg',
  src: party.src ? party.src : 'https://chalacabar.com.br/img/agenda/default-src3.jpg',
})
