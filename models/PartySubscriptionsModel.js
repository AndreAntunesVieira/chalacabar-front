import 'isomorphic-unfetch'
import BaseModel from './_BaseModel'

export default class PartySubscriptionsModel extends BaseModel {
  route = 'party-subscriptions'
  all() {
    if(this.notAdmin) return this.crashNotAdmin
    return this.get()
  }

  find(partySlug) {
    if(this.notAdmin) return this.crashNotAdmin
    return this.get({ route: partySlug })
  }

  submit(data) {
    return this.post({ data })
  }
}
