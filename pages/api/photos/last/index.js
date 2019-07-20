import PhotosModel from 'models/PhotosModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new PhotosModel().lastAlbums(2).then(sendOk(res))
}
