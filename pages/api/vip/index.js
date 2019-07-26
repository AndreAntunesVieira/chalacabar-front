import VipModel from 'models/VipModel'
import { sendCreated, sendUnprocessableEntity } from 'helpers/api/SendResponse'
import { requestJson } from 'helpers/RequestHelpers'

export default (req, res) => {
  const query = requestJson(req)
  const { partyId, tableNumber } = query
  return new VipModel()
    .isFree(partyId, tableNumber)
    .then(() => new VipModel().create(query))
    .then(sendCreated(res))
    .catch(e => {
      if (e === false) return sendUnprocessableEntity(res, 'Desculpe, alguém acabou de reservar esta mesa :(')
    })
}
