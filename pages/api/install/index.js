import InstallationsModel from 'models/InstallationsModel'
import { sendNotFound, sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  if(req.method !== 'POST') return sendNotFound(res)()
  return new InstallationsModel().create(req.query.userAgent).then(sendOk(res))
}
