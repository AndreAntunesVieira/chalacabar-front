import PartySubscriptionsModel from 'api/models/PartySubscriptionsModel'
import PromotersModel from 'api/models/PromotersModel'
import { send500, sendUnprocessableEntity } from 'helpers/api/SendResponse'

export default (req, res) => {
  let { phone, name, partyId, friends } = req.query
  const invalidMessage = validateCreate(req.query)
  if (invalidMessage) return sendUnprocessableEntity(res, invalidMessage)
  return validatePromoter(req.query)
    .then(promoter => {
      const names = promoter ? [] : [{ name, phone, main: true }]
      if (friends) {
        friends.forEach(name => {
          names.push({ name, main: false })
        })
      }
      if (!promoter) {
        return new PartySubscriptionsModel().create({ partyId, name, phone, promoterId: null }).then(invitedBy => {
          if (!friends || friends.length === 0) return null
          const data = friends.map(name => ({ partyId, name, invitedBy }))
          return new PartySubscriptionsModel().inviteBatch(data)
        })
      }
      const promoterId = promoter.id
      const data = friends.map(name => ({ partyId, name, invitedBy: null, promoterId }))
      return new PartySubscriptionsModel().inviteBatch(data)
    })
    .catch(e => {
      if (e === 'promoter_not_found') return sendUnprocessableEntity(res, 'Promoter não encontrado ou senha inválida')
      return send500(res, e)
    })
}

const validatePromoter = query => {
  if (!query.promoterPassword) return Promise.resolve(null)
  return new PromotersModel().find(query.name, query.promoterPassword)
}

const validateCreate = query => {
  if (!query.name) return 'Nome não pode estar em branco'
  if (!query.promoterPassword && !query.phone) return 'Telefone não pode estar em branco'
  if (!query.partyId) return 'Dia da festa não encontrado'
  if (!query.promoterPassword && query.name.trim().indexOf(' ') <= 0) return 'Insira nome e sobrenome'
  if (query.phone && !query.phone.match(/\(\d{2}\) (\d{4}|\d{5})-(\d{4}|\d{5})/)) return 'Formato de telefone errado'
}
