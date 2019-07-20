import BaseModel from 'models/_BaseModel'

export default class PartySubscriptionsModel extends BaseModel {
  table = 'vip'

  isFree = (partyId, tableNumber) => {
    return this.querySingle(`SELECT * FROM ${this.table} WHERE party_id = ? and table_number = ?`, [
      partyId,
      tableNumber,
    ])
      .then(() => Promise.reject('empty'))
      .catch(error => {
        if (error === 'empty') return Promise.reject(false)
        return Promise.resolve(true)
      })
  }

  partyReservedTables = partyId => {
    return this.querySingle(`SELECT GROUP_CONCAT(table_number) as reserved_tables FROM ${this.table} WHERE party_id = ? AND status != 'rejected'`, [partyId])
      .then(row => row.reserved_tables ? row.reserved_tables.split(',') : [])
      .catch(e => {
        console.log(e)
        return []
      })
  }

  create = ({ partyId, name, phone, email, tableNumber, status = 'awaiting_approval' }) => {
    return this.insertFromEntriesAndGetID(
      ['party_id', 'name', 'phone', 'email', 'table_number', 'status'],
      [partyId, name, phone, email, tableNumber, status],
    )
  }
}
