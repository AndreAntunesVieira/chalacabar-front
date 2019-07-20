import PhotosModel from 'models/PhotosModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PhotosModel().all(req.headers.page || 1).then(sendOk(res))
}
