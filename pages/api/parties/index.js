import PartiesModel from 'models/PartiesModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  console.log('hehe')
  return new PartiesModel().all().then(sendOk(res))
}
