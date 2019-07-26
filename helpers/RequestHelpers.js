export const requestJson = req => {
  const body = typeof req.body === 'string' ? JSON.parse(req.body): req.body
  return {...req.query, ...body }
}
