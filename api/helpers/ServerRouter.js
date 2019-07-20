import pathToRegexp from 'path-to-regexp'
import ServerBridge from 'api/helpers/ServerBridge'

export default class ServerRouter {
  _routes = []

  constructor(req, res, next) {
    this.bridge = new ServerBridge(req, res, next)
  }

  get = (...args) => this.add('GET', ...args)
  post = (...args) => this.add('POST', ...args)

  add = (httpMethod, pattern, instanceClass, method) => {
    this._routes.push({
      regex: pathToRegexp(pattern),
      instanceClass,
      method,
      pattern,
      httpMethod,
    })
    return this
  }

  listen = () => {
    if (this.bridge.method === 'OPTIONS') return this.bridge.sendOptions()
    const match = this._routes.find(
      ({ regex, httpMethod }) => regex.test(this.bridge.pathname) && this.bridge.method === httpMethod
    )
    if (!match) return this.bridge.send404()
    const query = this._compile(match)
    const instance = new match.instanceClass(this.bridge, query)
    const promise = instance[match.method]()
    if (this.bridge.sent) return null
    if (!promise) return this.bridge.send404()
    if (typeof promise.then !== 'function') return this.bridge.sendJson(promise)
    return promise
      .then(result => this.bridge.sendJson(result))
      .catch(e => this.bridge.send404())
  }

  _compile = ({ pattern, regex }) => {
    const fields = pattern.match(/\:([\w\-]+)/g)
    const matchedFields = regex.exec(this.bridge.pathname)
    const query = { ...this.bridge.req.body, ...this.bridge.query }
    if (!fields) return query
    return fields.reduce((obj, field, index) => {
      obj[field.replace(/[:?]/, '')] = matchedFields[index + 1]
      return obj
    }, query)
  }
}
