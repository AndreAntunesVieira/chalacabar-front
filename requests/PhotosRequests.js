import Requests from './_BaseRequests'

export default class PhotosRequests extends Requests {
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
