import 'isomorphic-unfetch'
import BaseModel from './_BaseModel'

export default class SponsorsModel extends BaseModel {
  route = 'sponsors'
  all(){
    return this.get()
  }
}
