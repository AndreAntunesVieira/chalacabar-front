import React, { Component } from 'react'
import { connect } from 'react-redux'
import delay from 'timeout-as-promise'
import styled from 'styled-components'
import PartiesRequests from '../../requests/PartiesRequests'
import Side from '../../helpers/Side'
import MainView from '../../components/views/MainView'
import HomeSectionPartiesImage from '../../components/home-sections/parties/HomeSectionPartiesImage'
import Button from '../../components/common/Button'
import ListName from '../../components/forms/ListName'
import DangerousHTML from '../../components/common/DangerousHTML'
import PageTitle from '../../components/common/PageTitle'
import PartySubscriptionsRequests from '../../requests/PartySubscriptionsRequests'
import { showNotification } from '../../store/NotificationStore'
import PartyVipSubmition from '../../components/forms/PartyVipSubmition'

class Slug extends Component {
  static getInitialProps({ req, query }) {
    const slug = query.slug
    return new PartiesRequests(req).find(slug).then(party => {
      const now = new Date()
      now.setHours(now.getHours() - now.getTimezoneOffset() / 60)
      const dateTime = party.date.replace(/T.*/, `T${party.listTime}.000Z`)
      const listBlocked = new Date(dateTime).getTime() < now.getTime()
      return { ...party, now: now.toISOString().replace(/\.\d{3}Z/, '.000Z'), listBlocked, dateTime }
    })
  }

  state = {
    friends: [false],
    total: 0,
    male: 0,
    female: 0,
    malePrice: 30,
    femalePrice: 15,
    maleTax: 5.3,
    femaleTax: 3.2,
  }

  componentWillMount() {
    if (Side.client && window.location.hash) {
      this.hash = window.location.hash.replace('#', '')
      window.location.hash = ''
      delay(10).then(() => {
        const element = document.getElementById(this.hash)
        if (!element) return null
        window.scrollTo({ left: 0, top: element.getBoundingClientRect().top - 50, behavior: 'smooth' })
        delay(300).then(() => {
          if (this.hash === 'lista') {
            const input = element.querySelector('input')
            input && input.focus()
          }
        })
      })
    }
  }

  onSubmit = (e, data) => {
    const target = e.target
    return new PartySubscriptionsRequests()
      .submit({ ...data, partyId: this.props.id })
      .then(() => {
        this.props.showNotification({ text: 'Nome na lista confirmado :)', color: 'success' })
        return target.reset()
      })
      .catch(e => {
        this.props.showNotification({ text: e.data.error.toString(), color: 'danger' })
      })
  }

  update = () => {
    return delay(10).then(() => {
      const male = this.state.malePrice + this.state.maleTax
      const female = this.state.femalePrice + this.state.femaleTax
      const total = male * this.state.male + female * this.state.female
      this.setState({ total })
    })
  }

  render = () => (
    <MainView>
      <PageTitle>{this.props.title} | Chalaça Bar Ipanema</PageTitle>
      <HomeSectionPartiesImage {...this.props} hasList={false} purchasable={false} />

      {this.props.ticketLink && (
        <section className="ph8" id="comprar">
          <h1>Compre seu ingresso agora mesmo!</h1>
          <Button target="_blank" large success href={this.props.ticketLink}>Ver opções de compra</Button>
        </section>
      )}
      <section className="ph8" id="descricao">
        <h1>{this.props.title}</h1>
        <Description {...this.props} />
      </section>
      <section className="ph8 mh8" id="lista">
        <ListName
          onSubmit={this.onSubmit}
          reset={this.reset}
          blocked={this.props.listBlocked}
          listTime={this.props.listTime.replace(/(.*:.*):.*/, '$1')}
        />
      </section>
      <section className="ph8 mh8" id="vip">
        <PartyVipSubmition partyId={this.props.id} date={this.props.date} />
      </section>
    </MainView>
  )
}

function Description({ description, attractions, promos, tickets, label = '', buyLink }) {
  if (!attractions && !description) return null
  if (!attractions) {
    return (
      <DescriptionContainer>
        <h2>{label}</h2>
        <DangerousHTML>{description.replace(/\n/g, '<br />')}</DangerousHTML>
      </DescriptionContainer>
    )
  }
  return (
    <>
      <Description label="Atrações:" description={attractions} />
      <Description label="Promoções:" description={promos} />
      <Description label="Ingressos:" description={tickets} buyLink={buyLink} />
      <Description label="Informações e reservas:" description={infos} />
    </>
  )
}

const Tickets = styled.div`
  margin: 8px 4px 0 4px;
  padding: 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
  h4 {
    margin: 0;
  }
  h6 {
    font-size: 11px;
    font-weight: normal;
    margin: 0;
  }
  .sex-column {
    width: 80px;
  }
  .num-column {
    width: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      background-color: transparent;
      border: 1px solid #ddd;
      &:first-child {
        border-radius: 4px 4px 0 0;
      }
      &:last-child {
        border-radius: 0 0 4px 4px;
      }
    }
  }
  > div:first-child {
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    margin-bottom: 8px;
  }
`
const TicketTotal = styled.div`
  margin: 0 4px 8px 4px;
  border-radius: 0 0 4px 4px;
  padding: 8px 0;
  b {
    margin-right: 5px;
  }
  button {
    //color: #555;
  }
`

const DescriptionContainer = styled.div`
  h2 {
    color: #f19816;
  }
`

const infos = `- 3248-2357 Escritório horário comercial
- 99257-1590 Whatsapp atendimento horário comercial`

export default connect(
  null,
  { showNotification }
)(Slug)
