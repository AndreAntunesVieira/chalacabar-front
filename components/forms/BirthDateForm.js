import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TextInput from 'components/common/TextInput'
import Button from 'components/common/Button'
import { serializeForm } from 'helpers/FormSerializer'
import PhoneNormalizer from 'helpers/normalizers/PhoneNormalizer'
import DateNormalizer from 'helpers/normalizers/DateNormalizer'
import RGNormalizer from 'helpers/normalizers/RGNormalizer'
import { showNotification } from 'store/NotificationStore'

class BirthDateForm extends Component {
  state = {
    friends: [false, false, false, false, false],
  }

  addFriend = ({ target }) => {
    const friends = [...this.state.friends, false]
    this.setState({ friends })
    const inputWrapper = target.parentElement
    setTimeout(() => {
      const input = inputWrapper.nextSibling.querySelector('input')
      input.focus()
    }, 10)
  }

  inputLabel(index) {
    if (index + 1 === this.state.friends.length) return '+1 amigo'
    return undefined
  }

  submitList = e => {
    e.preventDefault()
    const target = e.target
    const data = serializeForm(target)
    if (!data.name) {
      document.querySelector('input[name=name]').focus()
      return this.props.showNotification({
        color: 'danger',
        text: 'Você deve inserir seu nome completo (Aniversariante)',
      })
    }
    data.name = data.name.trim()
    if (data.name.indexOf(' ') < 0) {
      document.querySelector('input[name=name]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Insira nome e sobrenome (Aniversariante)' })
    }
    if (!data.vip) {
      document.querySelector('input[name=vip]').focus()
      return this.props.showNotification({
        color: 'danger',
        text: 'Você deve inserir o nome do seu acompanhante',
      })
    }
    data.vip = data.vip.trim()
    if (data.vip.indexOf(' ') < 0) {
      document.querySelector('input[name=vip]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Insira nome e sobrenome (Acompanhante)' })
    }
    if (!data.rg) {
      document.querySelector('input[name=rg]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir o seu número de RG' })
    }
    if (!data.phone) {
      document.querySelector('input[name=phone]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir o seu número de celular' })
    }
    if (!data.birthDate || !data.birthDate.match(/\d{2}\/\d{2}\/\d{4}/)) {
      document.querySelector('input[name=birthDate]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir sua data de nascimento' })
    }
    if (!data.partyDate || !data.partyDate.match(/\d{2}\/\d{2}\/\d{4}/)) {
      document.querySelector('input[name=partyDate]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir a data da festa' })
    }
    const diff = diffBrDates(data.partyDate, data.birthDate)
    if(diff > 15){
      return this.props.showNotification({ color: 'danger', text: 'A data da festa deve ser no máximo 15 dias depois do seu aniversário' })
    }
    if(diff < -7){
      return this.props.showNotification({ color: 'danger', text: 'A data da festa deve ser no mínimo 7 dias antes do seu aniversário' })
    }
    const diffToday = diffBrDateFromToday(data.partyDate)
    if(diffToday < 0){
      return this.props.showNotification({ color: 'danger', text: 'Você só pode enviar ou editar uma lista de aniversário até 1 dia antes da festa' })
    }
    if(diffToday > 15){
      return this.props.showNotification({ color: 'danger', text: 'Você só pode enviar uma lista de aniversário 15 dias antes da festa' })
    }
    if (data.phone.length < 14 || data.phone.match(/\(\d{2}\) [32]/)) {
      return this.props.showNotification({ color: 'danger', message: 'Número de celular inválido' })
    }
    data.friends = (data.friends || []).map(friend => friend.trim()).filter(name => name)
    if (data.friends.length < 5) {
      document.querySelector('input[name=vip]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir no mínimo 5 amigos na lista' })
    }
    if (data.friends.some(name => name.indexOf(' ') < 0)) {
      document.querySelector('input[name=vip]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Insira nome e sobrenome de todos os convidados' })
    }
    data.friends = (data.friends || []).map(friend => friend.trim()).filter(name => name)
    data.birthDate = data.birthDate.replace(/(.*)\/(.*)\/(.*)/, '$3-$2-$1')
    data.partyDate = data.partyDate.replace(/(.*)\/(.*)\/(\d{2})$/, '$1/$2/20$3').replace(/(.*)\/(.*)\/(.*)/, '$3-$2-$1')
    this.props.onSubmit(e, data)
  }

  render = () => (
    <form action="#" onSubmit={this.submitList}>
      <H2>Lista de convidados:</H2>
      <TextInput name="name" label="Seu nome (aniversariante):" placeholder="Nome Completo" />
      <TextInput name="vip" label="Nome do seu acompanhante:" placeholder="Nome Completo" />
      <TextInput name="rg" label="RG:" placeholder="9999999999" normalizer={RGNormalizer} />
      <TextInput name="phone" label="Celular (Whatsapp):" placeholder="(51) 99999-9999" normalizer={PhoneNormalizer} />
      <TextInput name="birthDate" label="Data de nascimento:" placeholder="dd/mm/aaaa" normalizer={DateNormalizer} />
      <TextInput name="partyDate" label="Data da festa:" placeholder="dd/mm/aaaa" normalizer={DateNormalizer} />

      {this.state.friends.map((value, key) => (
        <TextInput
          key={key}
          name="friends[]"
          label="Nome do seu convidado:"
          placeholder="Nome completo"
          buttonLabel={this.inputLabel(key)}
          onClick={this.addFriend}
        />
      ))}
      <Buttons>
        <Button success>Enviar nomes</Button>
      </Buttons>
    </form>
  )
}

const H2 = styled.h2`
  margin: 24px 0 0 0;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`

function diffBrDates(brDate1, brDate2){
  const date1 = new Date(brDate1.replace(/(.*)\/(.*)\/(.*)/, `$3-$2-$1`))
  const year = date1.getFullYear()
  const date2 = new Date(brDate2.replace(/(.*)\/(.*)\/(.*)/, `${year}-$2-$1`))
  const diffTime = date1.getTime() - date2.getTime()
  return diffTime / 86400000
}

function diffBrDateFromToday(brDate1){
  const date1 = new Date(brDate1.replace(/(.*)\/(.*)\/(.*)/, `$3-$2-$1`))
  const date2 = new Date()
  date2.setHours(0)
  date2.setMinutes(0)
  const diffTime = date1.getTime() - date2.getTime()
  return diffTime / 86400000
}

export default connect(
  null,
  { showNotification }
)(BirthDateForm)
