import BaseModel from './_BaseModel'

export default class BirthDatesModel extends BaseModel {
  route = 'birth-dates'

  submit(data) {
    return this.post({ data })
  }
}
