import Requests from './_BaseRequests'

export default class PartiesRequests extends Requests {
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
  src3: party.src3 ? party.src3 : 'https://img.chalacabar.com.br/agenda/default-src.jpeg',
  src2: party.src2 ? party.src2 : 'https://img.chalacabar.com.br/agenda/default-src3.jpeg',
  src: party.src ? party.src : 'https://img.chalacabar.com.br/agenda/default-src3.jpg',
})
