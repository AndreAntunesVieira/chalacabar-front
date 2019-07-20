import BaseModel from '_BaseModel'

export default class InstallationsModel extends BaseModel {
  table = 'installations'

  create = (userAgent = '') => this.insertFromEntriesAndGetID(['user_agent'], [userAgent])
}
