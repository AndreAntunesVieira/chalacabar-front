import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import delay from 'timeout-as-promise'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

export default class Map extends Component{
  state = { ready: false, loaded: false }

  componentDidMount(){
    delay(2000).then(() => this.setState({ loaded: true }, this.ready))
  }

  ready = () => {
    delay(1000).then(() => this.setState({ ready: true }))
  }

  render = () => {
    if(!this.state.loaded) return <Container />
    return (
      <Container className={classNames({ ready: this.state.ready })}>
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuYTRIwyZET7YSyeiHiqCOSNTVNRYd35Q&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Container>
    )
  }
}

const MapComponent = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: -30.1332125, lng: -51.2309347 }}>
      <Marker position={{ lat: -30.1332125, lng: -51.2309347 }} />
    </GoogleMap>
  ))
)

const Container = styled.div`
  margin-top: 16px;
  height: 400px;
  opacity: 0;
  transition: all ease 300ms;
  &.ready{
    opacity: 1;
  }
`
