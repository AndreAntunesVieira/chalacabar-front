import BaseModel from 'api/models/_BaseModel'

export default class ServerBridge {
  constructor(req, res, next) {
    this.req = req
    this.res = res
    this.sent = false
    this.next = next
  }

  get url() {
    return this.req.url
  }

  get pathname() {
    return this.req.url.replace(/[?].*/, '').replace(/\/\//g, '/')
  }

  get query() {
    return this.req.query || {}
  }

  get method() {
    return this.req.method || 'GET'
  }

  send = (...args) => this.res.send(...args).then(() => BaseModel.close())

  sendJson = content => {
    this.setAccessControl()
    this.res.set('Content-Type', 'application/json')
    this.sent = true
    return this.res.send(JSON.stringify(content))
  }

  setAccessControl = () => {
    if(this.sent) return null
    this.res.set(
      'Access-Control-Allow-Headers',
      'authorization,browser,client,content-type,device,platform,page'
    )
    this.res.set(
      'Access-Control-Allow-Methods',
      'HEAD, OPTIONS, GET, POST, PUT, DELETE'
    )
    this.res.set('Access-Control-Allow-Origin', '*')
  }

  sendOptions = () => {
    if(this.sent) return null
    this.setAccessControl()
    this.sent = true
    return this.res.send('')
  }

  send404 = e => {
    if(this.sent) return null
    console.log('send404')
    this.setAccessControl()
    this.res.status(404)
    this.sent = true
    this.res.send('Not found')
  }

  send422 = error => {
    if(this.sent) return null
    console.log('send422')
    this.setAccessControl()
    this.res.status(422)
    this.sent = true
    this.sendJson({ error })
  }

  send500 = error => {
    console.log(error)
    if(this.sent) return null
    console.log('send500')
    this.setAccessControl()
    this.res.status(500)
    this.sent = true
    this.sendJson({ error })
  }

  send201 = data => {
    if(this.sent) return null
    this.setAccessControl()
    this.res.status(201)
    this.sent = true
    return data ? this.sendJson(data) : this.res.send('')
  }
}
