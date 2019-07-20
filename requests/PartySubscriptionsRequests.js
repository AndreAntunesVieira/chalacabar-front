
import Requests from './_BaseRequests'

export default class PartySubscriptionsRequests extends Requests {
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
