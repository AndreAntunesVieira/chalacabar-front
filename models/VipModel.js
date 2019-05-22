import BaseModel from './_BaseModel'

export default class VipModel extends BaseModel {
  route = 'vip'

  submit(data){
    return this.post({ data })
  }

  getPartyTables(partyId){
    return this.get({ route: partyId })
  }
}
