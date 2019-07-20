import VipModel from 'models/VipModel'
import { sendCreated, sendUnprocessableEntity } from 'helpers/api/SendResponse'

export default (req, res) => {
  const { partyId, tableNumber } = req.query
  return new VipModel()
    .isFree(partyId, tableNumber)
    .then(() => new VipModel().create(req.query))
    .then(() => sendCreated(res))
    .catch(e => {
      if (e === false) return sendUnprocessableEntity(res, 'Desculpe, alguém acabou de reservar esta mesa :(')
    })
}
