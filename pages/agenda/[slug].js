import React, { Component } from 'react'
import { connect } from 'react-redux'
import delay from 'timeout-as-promise'
import styled from 'styled-components'
import PartiesRequests from 'requests/PartiesRequests'
import Side from 'helpers/Side'
import MainView from 'components/views/MainView'
import HomeSectionPartiesImage from 'components/home-sections/parties/HomeSectionPartiesImage'
import ListName from 'components/forms/ListName'
import DangerousHTML from 'components/common/DangerousHTML'
import PageTitle from 'components/common/PageTitle'
import PartySubscriptionsRequests from 'requests/PartySubscriptionsRequests'
import { showNotification } from 'store/NotificationStore'
import PartyVipSubmition from 'components/forms/PartyVipSubmition'

const s1Style = { marginTop: 64 }

class Slug extends Component {
  static getInitialProps({ req, query }) {
    const slug = query.slug
    return new PartiesRequests(req).find(slug).then(party => {
      const now = new Date()
      const hoursZone = 3//now.getTimezoneOffset() / 60
      now.setHours(now.getHours() - hoursZone)
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

  render = () => (
    <MainView>
      <PageTitle>{this.props.title} | Chalaça Bar Ipanema</PageTitle>
      <HomeSectionPartiesImage {...this.props} hasList={false} purchasable={false} />
      <section className="ph8" style={s1Style} id="descricao">
        <h1>{this.props.title}</h1>
        <Description {...this.props} />
      </section>
      {this.props.hasList && (
        <section className="ph8 mh8" id="lista">
          <ListName
            onSubmit={this.onSubmit}
            reset={this.reset}
            blocked={this.props.listBlocked}
            listTime={this.props.listTime.replace(/(.*:.*):.*/, '$1')}
          />
        </section>
      )}
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
