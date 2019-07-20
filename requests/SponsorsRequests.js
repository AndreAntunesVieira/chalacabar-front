import Requests from './_BaseRequests'

export default class SponsorsRequests extends Requests {
  route = 'sponsors'
  all(){
    return this.get()
  }
}
