import BaseModel from 'api/models/_BaseModel'

export default class PartySubscriptionsModel extends BaseModel {
  table = 'party_subscriptions'

  inviteBatch = friends => {
    const invites = friends.map(({ partyId, name, invitedBy, promoterId }) => [
      partyId,
      name,
      invitedBy,
      promoterId,
    ])
    return this.insertBatch(['party_id', 'name', 'invited_by', 'promoter_id'], invites)
  }

  create = ({ partyId, name, phone, promoterId }) => {
    return this.insertFromEntriesAndGetID(
      ['party_id', 'name', 'phone', 'promoter_id'],
      [partyId, name, phone, promoterId]
    )
  }
}
