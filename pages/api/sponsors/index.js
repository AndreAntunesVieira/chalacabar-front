import SponsorsModel from 'models/SponsorsModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new SponsorsModel().all().then(sendOk(res))
}
