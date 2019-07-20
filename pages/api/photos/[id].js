import PhotosModel from 'api/models/PhotosModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PhotosModel().show(req.query.id).then(sendOk(res))
}
