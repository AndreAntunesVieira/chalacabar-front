import BirthDatesModel from 'models/BirthDatesModel'
import { sendCreated, sendNotFound, sendUnprocessableEntity } from 'helpers/api/SendResponse'
import { requestJson } from 'helpers/RequestHelpers'

export default (req, res) => {
  if (req.method !== 'POST') return sendNotFound(res)()

  const query = requestJson(req)
  const invalidMessage = validateCreate(query)
  if (invalidMessage) return sendUnprocessableEntity(res, invalidMessage)
  return new BirthDatesModel().create(query).then(sendCreated(res))
}

const validateCreate = query => {
  if (!query.name) return "Name can't be empty"
  if (!query.phone) return "Phone name cant't be empty"
  if (query.name.length < 5) return 'Name must have 5 or mor letters'
  if (!query.name.match(/(\w+) (\w+)/)) return 'Insert name and surname'
  if (!query.phone.match(/\(\d{2}\) (\d{4}|\d{5})-(\d{4}|\d{5})/)) return 'Wrong phone name format'
  if (!query.rg.match(/(\d{2})\.(\d{3})\.(\d{3})-(\d{1,2})/)) return 'Insert name and surname'
  if (!query.partyDate) return "Date party date cant't be empty"
  if (!query.partyDate.match(/\d{4}-\d{2}-\d{2}/)) return 'Invalid party date'
  if (!query.birthDate) return "Birth date cant't be empty"
  if (!query.birthDate.match(/\d{4}-\d{2}-\d{2}/)) return 'Invalid birth date'
}
