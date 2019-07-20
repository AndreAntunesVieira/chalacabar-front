import VipModel from 'models/VipModel'
import { sendOk } from 'helpers/api/SendResponse'

export default (req, res) => {
  return new VipModel()
    .partyReservedTables(req.query.partyId)
    .then(reservedTables => ({ reservedTables: reservedTables.sort((a, b) => a > b).map(str => Number(str)) }))
    .then(sendOk(res))
}
