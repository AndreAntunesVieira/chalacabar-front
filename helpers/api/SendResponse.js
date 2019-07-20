export const sendNotFound = res => content => {
  res.status(404)
  return res.end(content)
}

export const sendOk = (res) => content => {
  res.status(200)
  return res.json(content)
}

export const sendCreated = (res, content) => {
  res.status(201)
  if(!content) return res.end()
  return res.json(content)
}

export const sendUnprocessableEntity = (res, message) => {
  res.status(422)
  if(!message) return res.end()
  return res.json({ message })
}

export const send500 = res => {
  res.status(500)
  if(!message) return res.end()
  return res.json({ message })
}
