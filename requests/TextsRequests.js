import Requests from './_BaseRequests'

export default class TextsRequests extends Requests {
  route = 'texts'

  find = route => this.get({ route })
}
