import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import VipRequests from 'requests/VipRequests'
import { serializeForm } from 'helpers/FormSerializer'
import TextInput from 'components/common/TextInput'
import PhoneNormalizer from 'helpers/normalizers/PhoneNormalizer'
import Select from 'components/common/Select'
import Button from 'components/common/Button'
import { showNotification } from 'store/NotificationStore'
import A from 'components/common/A'

class PartyVipSubmition extends Component {
  state = { options: [], markers: [], finished: false }

  componentDidMount() {
    const date = new Date(this.props.date)
    const isSaturday = date.getDay() === 6
    this.setState({ isSaturday })
    new VipRequests().getPartyTables(this.props.partyId).then(({ reservedTables }) => {
      const finished = reservedTables.length === 25
      const options = [
        { value: 31, disabled: reservedTables.includes(31), children: 'Camarote 1' },
        { value: 32, disabled: reservedTables.includes(32), children: 'Camarote 2' },
        { value: 33, disabled: reservedTables.includes(32), children: 'Camarote 3' },
        { value: 34, disabled: reservedTables.includes(34), children: 'Camarote 4' },
        { value: 35, disabled: reservedTables.includes(35), children: 'Camarote 5' },
      ]
      const markers = [
        { value: 31, disabled: reservedTables.includes(31), id: 'vip-marker-camarote-1' },
        { value: 32, disabled: reservedTables.includes(32), id: 'vip-marker-camarote-2' },
        { value: 33, disabled: reservedTables.includes(33), id: 'vip-marker-camarote-3' },
        { value: 34, disabled: reservedTables.includes(34), id: 'vip-marker-camarote-4' },
        { value: 35, disabled: reservedTables.includes(35), id: 'vip-marker-camarote-5' },
      ]
      for (let value = 1; value <= 21; value++) {
        if (value >= 13 && value <= 17) continue
        const disabled = reservedTables.includes(value)
        options.push({ value, disabled: isSaturday || disabled, children: `Mesa ${value}` })
        markers.push({ value, disabled, id: `vip-marker-mesa-${value}` })
      }
      this.setState({ options, finished, markers })
    })
  }

  selectTable = value => {
    const type = value > 30 ? 'Camarote' : 'Mesa'
    const marker = this.state.markers.find(marker => marker.value === value)
    if (marker.disabled) {
      return this.props.showNotification({
        color: 'danger',
        text: `${type} indisponível para este dia.`,
        duration: 10000,
      })
    }
    if (this.state.isSaturday && type === 'Mesa') {
      return this.props.showNotification({
        color: 'danger',
        text: `Não reservamos mesas aos sábados, apenas camarotes.`,
        duration: 10000,
      })
    }
    document.querySelector('select[name=tableNumber]').value = value
    location.hash = 'reservas'
    document.querySelector('#reservas input[name=name]').focus()
    const message = value > 30 ? `Camarote ${value - 30} selecionado` : `Mesa ${value} selecionada`
    this.props.showNotification({
      color: 'warning',
      text: `${message}, preencha nome e telefone no formulário abaixo para continuar a reserva.`,
      duration: 10000,
    })
  }

  submit = e => {
    e.preventDefault()
    if (this.state.finished) return null
    const target = e.target
    const data = serializeForm(target)
    if (!data.name || !data.phone) {
      const field = !data.name ? 'nome' : 'telefone'
      return this.props.showNotification({
        color: 'danger',
        text: `É necessário preencher o ${field} antes de reservar.`,
        duration: 10000,
      })
    }
    const conf = confirm(
      'Sua reserva só estará confirmada após o pagamento parcial, \nentraremos em contato pelo celular informado para os detalhes de pagamento. \n\nOk, estou ciente.'
    )
    if (!conf) return null
    data.partyId = this.props.partyId
    return new VipRequests()
      .submit(data)
      .then(() => {
        this.props.showNotification({
          color: 'success',
          text: 'Sua reserva foi pré-agendada, entraremos em contato para confirmação e pagamento',
          duration: 15000,
        })
        const number = Number(data.tableNumber)
        const modifier = number > 30 ? `camarote-${number - 30}` : `mesa-${number}`
        const id = `vip-marker-${modifier}`
        const markers = this.state.markers.map(mark => (mark.id === id ? { ...mark, disabled: true } : mark))
        const options = this.state.options.map(option =>
          option.value === number ? { ...option, disabled: true } : option
        )
        const finished = this.state.options.every(option => option.disabled)
        this.setState({ markers, options, finished })
      })
      .catch(({ data }) => {
        this.props.showNotification({ color: 'danger', text: data.error })
      })
  }

  render = () => (
    <Form onSubmit={this.submit} disabled={this.state.finished}>
      <h2>Reservas e Camarotes</h2>
      <div>
        Entenda como funciona a <A href="/reservas#entenda">reserva de camarotes clicando aqui</A>
      </div>
      <ImageContainer>
        <img src="/img/layout/camarotes-novos.jpg" />
        {this.state.markers.map(({ value, ...mark }) => (
          <Marker {...mark} key={mark.id} onClick={() => this.selectTable(value)} />
        ))}
      </ImageContainer>
      <h2>Pré-reserve agora</h2>
      {this.state.finished && <FinishedMessage>Todas as mesas/camarotes já foram reservados</FinishedMessage>}
      <div className="content" id="reservas">
        <TextInput name="name" label="Seu nome" placeholder="Seu nome completo" />
        <TextInput
          name="phone"
          label="Seu celular (Whatsapp):"
          placeholder="(51) 99999-9999"
          normalizer={PhoneNormalizer}
        />
        <Select name="tableNumber" label="Escolha uma das mesas/camarotes disponíveis:">
          {this.state.options.map(option => (
            <option {...option} key={option.value} />
          ))}
        </Select>
        <Buttons>
          <Button success>Reservar</Button>
        </Buttons>
      </div>
    </Form>
  )
}

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Marker = styled.div`
  position: absolute;
  min-height: 10px;
  min-width: 10px;
  display: block;
  opacity: ${props => (props.disabled ? 0.8 : 0)};
  background-color: rgba(255, 0, 0, 1);
  &#vip-marker-camarote-5 {
    left: 4.3%;
    top: 6.4%;
    width: 28.5%;
    height: 11.1%;
  }
  &#vip-marker-camarote-4 {
    left: 57%;
    top: 53%;
    width: 19%;
    height: 12.2%;
    border-radius: 0 0 100% 0;
    &:before {
      position: absolute;
      bottom: 0;
      right: 0;
      background: red;
      width: 62%;
      height: 42%;
      content: '';
      transform: skewY(-40.5deg) translate(0, -66%);
    }
    &:after {
      position: absolute;
      bottom: 0;
      right: 0;
      background: red;
      width: 36%;
      height: 22%;
      content: '';
      transform: skewX(-48.5deg) translate(-136%, 0);
    }
  }
  &#vip-marker-camarote-3 {
    left: 76.4%;
    top: 17.3%;
    width: 19%;
    height: 15.2%;
    background: rgb(255, 0, 0);
  }
  &#vip-marker-camarote-2 {
    left: 65.3%;
    top: 59.2%;
    width: 29.5%;
    height: 14.9%;
    border-radius: 70% 0 0 0;
    &:before {
      position: absolute;
      background: rgb(255, 0, 0);
      width: 37%;
      height: 25%;
      content: '';
      transform: skewY(-42deg) translate(0, 92%);
    }
    &:after {
      position: absolute;
      background: rgb(255, 0, 0);
      width: 37%;
      height: 25%;
      content: '';
      transform: skewx(-48deg) translate(73%, 0);
    }
  }
  &#vip-marker-camarote-1 {
    left: 36.2%;
    top: 66.22%;
    width: 27.8%;
    height: 12.3%;
    border-radius: 0 0 30% 32%;
    &:before {
      position: absolute;
      content: '';
      bottom: 0;
      border-top: 3.3vw solid red;
      border-left: 4vw solid transparent;
      border-right: 4vw solid transparent;
      width: calc(100% - 8vw);
      left: 0;
      @media (min-width: 760px) {
        border-top: 25px solid red;
        border-left: 33px solid transparent;
        border-right: 37px solid transparent;
        width: calc(100% - 69px);
      }
    }
    &:after {
      position: absolute;
      content: '';
      background-color: red;
      width: 100%;
      bottom: 25px;
      height: 10%;
    }
  }
  &#vip-marker-mesa-21 {
    left: 20.9%;
    top: 79%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-20 {
    left: 46%;
    top: 79%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-19 {
    left: 65.4%;
    top: 74.7%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-18 {
    left: 86.7%;
    top: 74.7%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-17 {
    left: 76.4%;
    top: 18.3%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-16 {
    left: 87.3%;
    top: 19.9%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-15 {
    left: 76.4%;
    top: 26.3%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-14 {
    left: 87.3%;
    top: 27.8%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-13 {
    left: 76.4%;
    top: 34.2%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-12 {
    left: 87.3%;
    top: 35.7%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-11 {
    left: 76.4%;
    top: 42.1%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-10 {
    left: 87.3%;
    top: 43.6%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-9 {
    left: 76.4%;
    top: 50%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-8 {
    left: 87.3%;
    top: 51.6%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-7 {
    left: 4.3%;
    top: 20.4%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-6 {
    left: 16.3%;
    top: 24.2%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-5 {
    left: 4.3%;
    top: 28.3%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-4 {
    left: 16.3%;
    top: 32.1%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-3 {
    left: 4.3%;
    top: 36.1%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-2 {
    left: 47.3%;
    top: 60.2%;
    width: 8.2%;
    height: 5%;
  }
  &#vip-marker-mesa-1 {
    left: 34.6%;
    top: 60.2%;
    width: 8.2%;
    height: 5%;
    border-radius: 0 0 0 30%;
  }
`

const FinishedMessage = styled.div`
  color: red;
  font-weight: bold;
  position: absolute;
  background-color: black;
  border-radius: 4px;
  padding: 4px 8px;
  text-align: center;
  z-index: 2;
  width: 80%;
  left: 10%;
  transform: rotate(-30deg) translate(-40px, 60px);
`

const Form = styled.form`
  position: relative;
  label {
    display: block;
    margin-bottom: 4px;
  }
  select {
    width: 100%;
    background-color: white;
    color: black;
  }
  h2 {
    margin-left: 0;
    margin-bottom: 8px;
  }
  a {
    color: white;
    font-weight: bold;
    letter-spacing: 0.8px;
  }
  .content {
    ${props => props.disabled && 'opacity: 0.2;'}
  }
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto 16px auto;
  max-width: 720px;
`

export default connect(
  null,
  { showNotification }
)(PartyVipSubmition)
