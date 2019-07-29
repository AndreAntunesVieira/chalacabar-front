import React, { Component } from 'react'
import styled from 'styled-components'
import PartiesRequests from 'requests/PartiesRequests'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import PartySmall from 'components/common/PartySmall'

class PartiesPage extends Component {
  static getInitialProps({ req }) {
    return new PartiesRequests(req).all().then(parties => ({ parties }))
  }

  state = { ...this.props }

  componentWillMount() {
    const parties = this.state.parties
    if (parties[0]) parties[0].active = true
    this.setState({ parties })
  }

  render = () => (
    <MainView>
      <PageTitle>Chalaça Bar Ipanema</PageTitle>

      {this.state.parties.map((party, key) => (
        <PartySmall key={key} {...party} />
      ))}

    </MainView>
  )
}

export default PartiesPage

const Address = styled.div`
  text-align: center;
  margin-top: 8px;
`
