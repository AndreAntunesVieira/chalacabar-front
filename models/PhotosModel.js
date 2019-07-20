import BaseModel from 'models/_BaseModel'

export default class PhotosModel extends BaseModel {
  static perPage = 16
  static defaultFrom = 'images AS A WHERE A.uid_parent = 0'
  static albumSelect =
    '(SELECT src FROM images AS B WHERE B.uid_parent = A.uid ORDER BY B.position LIMIT 1) as src'
  static defaultSelect = [
    'A.uid as id',
    'A.titulo as title',
    'A.data as date',
    'A.position',
    'A.href as slug',
  ].join(',')

  all = (page = 1) => {
    const perPage = PhotosModel.perPage
    const end = perPage * page
    const init = end - perPage
    return this.query(
      `SELECT ${PhotosModel.defaultSelect},${PhotosModel.albumSelect} FROM ${
        PhotosModel.defaultFrom
      } ORDER BY A.data DESC LIMIT ${init}, ${perPage}`
    )
  }

  count = () =>
    this.querySingle(
      `SELECT COUNT(*) AS counter FROM ${PhotosModel.defaultFrom}`
    ).then(result => ({
      total: Number(result.counter),
      pages: Math.ceil(Number(result.counter) / PhotosModel.perPage),
    }))

  lastAlbums = (limit = 2) =>
    this.query(
      `SELECT ${PhotosModel.defaultSelect},${PhotosModel.albumSelect} FROM ${
        PhotosModel.defaultFrom
      } ORDER BY A.data DESC LIMIT ${limit}`
    )

  showAlbum = slug =>
    this.querySingle(
      `SELECT ${PhotosModel.defaultSelect} FROM ${
        PhotosModel.defaultFrom
      } AND href = '${slug}' ORDER BY A.data DESC`
    ).then(album =>
      this.query(
        `SELECT uid as id, src, position, src FROM images AS A WHERE A.uid_parent = ${
          album.id
        }  ORDER BY A.position ASC`
      ).then(photos => ({ ...album, photos }))
    )

  show = id =>
    this.querySingle(
      `SELECT uid as id, src, position, src, uid_parent as parent_id FROM images AS A WHERE A.uid = ${id}`
    ).then(photo =>
      this.querySingle(
        `SELECT uid as id,titulo as title,data as date,position,href as slug FROM images WHERE uid = ?`,
        photo.parent_id
      ).then(album => {
        photo.album = album
        return photo
      })
    )
}


/*
match { regex: /^\/parties(?:\/)?$/i,
  instanceClass: [Function: PartiesController],
  method: 'index',
  pattern: '/parties' }
base model query
promise Promise { <pending> }
query connected Select src,src2,src3,titulo as title,descricao as description,data as date,href as slug,status,nomenalista as has_list,tempolista as list_time,attractions,promos,tickets,highlighted_call FROM agenda WHERE DATE(data) >= DATE(NOW()) AND src IS NOT NULL LIMIT 20
result undefined
send404 undefined
 */
