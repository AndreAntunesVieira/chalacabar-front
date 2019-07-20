import PhotosModel from 'models/PhotosModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PhotosModel().showAlbum(req.query.id).then(sendOk(res))
}
