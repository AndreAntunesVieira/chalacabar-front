import mysql from 'mysql'

let connected = false
let connection

export default class BaseModel {
  constructor() {}

  connect = () => {
    if (connected) return Promise.resolve(connection)
    if (connection) return this._waitConnection()
    return new Promise((resolve, reject) => {
      connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      })
      connection.connect(err => (err ? reject(err) : resolve(connection)))
      connected = true
    })
  }

  insertFromObject(data){
    const {fields, values} = Object.entries(data).reduce((result, [field, value]) => {
      result.fields.push(field)
      result.values.push(value)
      return result
    },{fields: [], values: []})
    return this.insertFromEntriesAndGetID(fields, values)
  }

  insertFromEntriesAndGetID(fields = [], values = []) {
    const fullFields = [...fields, 'created_at', 'updated_at'].join(',')
    const fullValues = [...values.map(() => '?'), 'NOW()', 'NOW()'].join(',')
    return this.query(
      `INSERT INTO ${this.table} (${fullFields}) VALUES (${fullValues});`,
      values
    )
      .then(() => this.querySingle('SELECT LAST_INSERT_ID() id;'))
      .then(({ id }) => id)
  }

  insertBatch(fields, batch) {
    console.log(fields)
    console.log(batch)
    const values = []
    const fullFields = [...fields, 'created_at', 'updated_at'].join(',')
    const fullValues = batch.map(v => {
      const vars = v.map(a => {
        values.push(a)
        return '?'
      })
      vars.push('NOW()')
      vars.push('NOW()')
      return vars.join(',')
    }).join('),(')
    console.log(`INSERT INTO ${this.table} (${fullFields}) VALUES (${fullValues})`)
    return this.query(`INSERT INTO ${this.table} (${fullFields}) VALUES (${fullValues})`, values)
  }

  static close() {
    if (connection) connection.resume()
    connected = false
  }

  querySingle = (...args) =>
    this.query(...args).then(results =>
      Array.isArray(results) && results[0] ? results[0] : Promise.reject()
    )

  query = (sql, values) => {
    return this.connect().then(connection => {
      if (Array.isArray(values))
        return new Promise(this._queryWithValues(connection, sql, values))
      if (typeof values !== 'undefined')
        return new Promise(this._queryWithValues(connection, sql, [values]))
      return new Promise(this._queryWithoutValues(connection, sql))
    })
  }

  _queryWithValues(connection, sql, values) {
    return (resolve, reject) => {
      connection.query(sql, values, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    }
  }

  _queryWithoutValues(connection, sql) {
    return (resolve, reject) => {
      connection.query(sql, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    }
  }

  _waitConnection = () => {
    if (connection.state === 'authenticated') return connection
    return new Promise(() => setTimeout(this._waitConnection, 50))
  }
}
