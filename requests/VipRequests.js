import Requests from './_BaseRequests'

export default class VipRequests extends Requests {
  route = 'vip'

  submit(data){
    return this.post({ data })
  }

  getPartyTables(partyId){
    return this.get({ route: partyId })
  }
}
