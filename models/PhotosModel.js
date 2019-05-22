import 'isomorphic-unfetch'
import BaseModel from './_BaseModel'

export default class PhotosModel extends BaseModel {
  route = 'photos'
  all(page = 1) {
    return this.get({ headers: { page }})
  }
  last() {
    return this.get({route: 'last'})
  }
  showAlbum(slug){
    return this.get({ route: `album/${slug}`})
  }
}
