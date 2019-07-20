import PhotosModel from 'api/models/PhotosModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PhotosModel().lastAlbums(req.query.limit).then(sendOk(res))
}
