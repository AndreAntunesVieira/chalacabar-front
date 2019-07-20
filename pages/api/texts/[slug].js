import TextsModel from 'models/TextsModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new TextsModel().find(req.query.slug).then(sendOk(res))
}
