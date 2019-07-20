import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TextInput from 'components/common/TextInput'
import Button from 'components/common/Button'
import { serializeForm } from 'helpers/FormSerializer'
import PhoneNormalizer from 'helpers/normalizers/PhoneNormalizer'
import { showNotification } from 'store/NotificationStore'

class ListName extends Component {
  state = {
    friends: [false],
  }

  submitList = e => {
    e.preventDefault()
    const target = e.target
    const data = serializeForm(target)
    if (this.state.promoter && !data.promoterPassword) {
      document.querySelector('input[name=promoterPassword]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Se você é um promoter coloque sua senha' })
    }
    if (!this.state.promoter) {
      if (!data.phone) {
        document.querySelector('input[name=phone]').focus()
        return this.props.showNotification({ color: 'danger', text: 'Você deve inserir o seu número de telefone' })
      }
      if (data.phone.length < 14 || data.phone.match(/\(\d{2}\) [32]/)) {
        return this.props.showNotification({ color: 'danger', text: 'Número de telefone inválido' })
      }
    }
    if (!data.name) {
      document.querySelector('input[name=name]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Você deve inserir seu nome completo' })
    }
    if (data.name.indexOf(' ') < 0 && !this.state.promoter) {
      document.querySelector('input[name=name]').focus()
      return this.props.showNotification({ color: 'danger', text: 'Insira nome e sobrenome' })
    }
    data.name = data.name.trim()
    data.friends = (data.friends || []).map(friend => friend.trim())
    this.props.onSubmit(e, data)
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

  increase = name => () => {
    const state = {}
    state[name] = this.state[name] + 1
    this.setState(state)
    this.update()
  }

  showPromoters = () => {
    const promoter = !this.state.promoter
    this.setState({ promoter })
  }

  decrease = name => () => {
    const state = {}
    state[name] = this.state[name] - 1
    if (state[name] < 0) return null
    this.setState(state)
    this.update()
  }

  promoterList = () => (
    <>
      <H2>Nome na lista de promoter:</H2>
      <TextInput name="name" label="Identificação do promoter:" placeholder="Nome do promoter" />
      {this.state.friends.map((value, key) => (
        <TextInput
          key={key}
          name="friends[]"
          label="Nome do seu convidado:"
          placeholder="Nome completo do seu convidado:"
          buttonLabel={this.inputLabel(key)}
          onClick={this.addFriend}
        />
      ))}
      <TextInput
        name="promoterPassword"
        type="password"
        label="Sua senha de promoter"
        placeholder="Sua senha de promoter"
      />
      <Buttons>
        <Promoters onClick={this.showPromoters} href="#promoters" tabIndex="0">
          Lista normal
        </Promoters>
        <Button success>Enviar nomes</Button>
      </Buttons>
    </>
  )

  normalList = () => (
    <>
      <H2>Nome na lista:</H2>
      <TextInput
        name="phone"
        label="Seu celular (Whatsapp):"
        placeholder="(51) 99999-9999"
        normalizer={PhoneNormalizer}
      />

      <TextInput name="name" label="Seu nome:" placeholder="Meu Nome Completo" />
      {this.state.friends.map((value, key) => (
        <TextInput
          key={key}
          name="friends[]"
          label="Nome do seu amigo:"
          placeholder="Nome completo do seu amigo"
          buttonLabel={this.inputLabel(key)}
          onClick={this.addFriend}
        />
      ))}
      <Buttons>
        <Promoters onClick={this.showPromoters} href="#promoters" tabIndex="0">
          Lista para Promoters
        </Promoters>
        <Button success>Enviar nomes</Button>
      </Buttons>
    </>
  )

  render = () => (
    <Container action="#" onSubmit={this.submitList} blocked={this.props.blocked}>
      {this.state.promoter ? this.promoterList() : this.normalList()}
      {this.props.blocked && <ListBlockedWarning>Lista encerrada as {this.props.listTime}</ListBlockedWarning>}
    </Container>
  )
}

const Promoters = styled.a`
  color: #005cb9;
  font-weight: bold;
  text-decoration: underline;
`

const Container = styled.form`
  position: relative;
  margin: 16px -16px -16px -16px;
  padding: 16px 16px 60px 16px;
  h2 {
    margin-top: 0;
  }
`

const ListBlockedWarning = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ff5722;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  z-index: 20;
`

const H2 = styled.h2`
  margin: 24px 0 0 0;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`
export default connect(
  null,
  { showNotification }
)(ListName)
