import 'isomorphic-unfetch'
import querystring from 'querystring'
import Side from 'helpers/Side'

export default class BaseModel {
  baseUrl = process.env.API
  route = ''

  constructor(req = {}, options = {}) {
    this.req = req
    this.defaultOptions = options
  }

  get notAdmin() {
    return true //TODO adicionar validação de admin logado
  }

  crashNotAdmin = () => {
    alert('Apenas admins podem executar este comando!')
    throw new Error('NOT ADMIN')
  }

  options(options = {}) {
    const parsedOptions = {}
    parsedOptions.method = options.method || 'GET'
    const headers = { ['Content-Type']: 'multipart/form-data', ...this.defaultOptions.headers, ...options.headers }
    parsedOptions.headers = Side.server ? headers : new Headers(headers)
    if (options.data) parsedOptions.body = JSON.stringify(options.data)
    return parsedOptions
  }

  path(route, opt) {
    let path = `${this.route}/${route}`
      .replace(/\/\//g, '/')
      .replace(/\/$/, '')
      .replace(/^\//, '')
    if (opt.method !== 'GET' || !opt.data) return `${this.baseUrl}/${path}`
    return `${this.baseUrl}/${path}?${querystring.stringify(opt.data)}`
  }

  json = r => Promise.resolve(r.json()).catch(() => null)

  request({ route = '', ...opt }) {
    const options = this.options(opt)
    return fetch(this.path(route, options), options).then(r => {
      if (r.status < 400 && !options.full) return this.json(r)
      return this.json(r).then(data => {
        const result = { data, headers: r.headers, status: r.status }
        return r.status < 400 ? result : Promise.reject(result)
      })
    })
  }

  get(options = {}) {
    return this.request(options)
  }

  post(options = {}) {
    return this.request({ ...options, method: 'POST' })
  }
}
