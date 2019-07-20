import PartiesModel from 'api/models/PartiesModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PartiesModel().findBySlug(req.query.slug)
    .then(sendOk(res))
}
