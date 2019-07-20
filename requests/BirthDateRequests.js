import Requests from './_BaseRequests'

export default class BirthDatesModel extends Requests {
  route = 'birth-dates'

  submit(data) {
    return this.post({ data })
  }
}
