import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
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

      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuYTRIwyZET7YSyeiHiqCOSNTVNRYd35Q&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <Address>Praça Sen. Alberto Pasqualini, 240 - Ipanema, Porto Alegre - RS, 91760-051</Address>
    </MainView>
  )
}

const MyMapComponent = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: -30.1332125, lng: -51.2309347 }}>
      <Marker position={{ lat: -30.1332125, lng: -51.2309347 }} />
    </GoogleMap>
  ))
)
export default PartiesPage

const Address = styled.div`
  text-align: center;
  margin-top: 8px;
`
