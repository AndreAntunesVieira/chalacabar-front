import BaseModel from 'models/_BaseModel'

export default class BirthDatesModel extends BaseModel {
  table = 'aniversarios'

  create = ({ phone, name, birthDate, partyDate, vip, friends = [],...params }) => {
    const data = {
      ...params,
      nome: name,
      nascimento: birthDate,
      datafesta: partyDate,
      telefone: phone,
      acompanhante: vip,
      convidados: friends.join(','),
      status: 0,
    }
    return this.insertFromObject(data)
  }
}
