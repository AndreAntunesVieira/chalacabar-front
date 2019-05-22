import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import styled from 'styled-components'
import Side from 'helpers/Side'
import PartiesModel from 'models/PartiesModel'
import PhotosModel from 'models/PhotosModel'
import A from 'components/common/A'
import SponsorsModel from 'models/SponsorsModel'
import HomeSectionParties from 'components/home-sections/parties/HomeSectionParties'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import PhotoAlbum from 'components/common/PhotoAlbum'
import PhotoNotification from 'components/common/PhotoNotification'

class HomePage extends Component {
  static async getInitialProps({ req }) {
    const [parties, photos, sponsors] = await Promise.all([
      new PartiesModel(req).scheduled(),
      new PhotosModel(req).last(),
      new SponsorsModel(req).all(),
    ])
    return { parties, photos, sponsors }
  }

  state = { ...this.props }

  componentWillMount() {
    const parties = this.state.parties
    if (parties[0]) parties[0].active = true
    this.setState({ parties })
    if (Side.client) {
      let deferredPrompt
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        deferredPrompt = e
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          deferredPrompt = null
        })
      })
    }
  }

  render = () => (
    <MainView>
      <PageTitle>Chalaça Bar Ipanema</PageTitle>
      <HomeSectionParties parties={this.state.parties} sufix="descricao" />
      <HomeMainDivider className="home-section" hasPhotos={this.state.photos.length > 0}>
        <div>
          <section id="reservas-e-aniversarios">
            <div>
              <h2>Reserva de camarotes e mesas</h2>
              <div className="banner" id="reservas">
                Fale com a gente pelo whats:
                <A href="whatsapp://send?abid=+5551992571590&text=Oi" className="whatapps">
                  51 99257-1590 - 09:00h às 18:00h
                </A>
                <A href="/reservas" className="banner-more">
                  Saiba mais
                </A>
              </div>
            </div>
            <div>
              <h2>Aniversários</h2>
              <A href="/aniversarios" className="banner banner-home-birthday">
                Free pra você e um acompanhante
                <span className="banner-more">Saiba mais</span>
              </A>
            </div>
          </section>
        </div>

        {this.state.photos.length > 0 && (
          <section id="fotos">
            <h2>Últimas Fotos</h2>
            <div className="photos-container">
              {this.state.photos.map(album => (
                <PhotoAlbum key={album.slug} {...album} />
              ))}
            </div>
            <A href="/fotos" className="banner" id="fotos-festas-passadas">
              Veja as fotos das festas passadas
            </A>
            <PhotoNotification />
          </section>
        )}
      </HomeMainDivider>

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
export default HomePage

const Address = styled.div`
  text-align: center;
  margin-top: 8px;
`

const HomeMainDivider = styled.div`
  @media (min-width: 1012px) {
    display: flex;
    flex-direction: ${props => (props.hasPhotos ? 'row' : 'column')};
    & > :first-child {
      width: ${props => (props.hasPhotos ? '445px;' : '100%')};
    }
    ${props =>
      !props.hasPhotos && `#reservas-e-aniversarios{ flex-direction: row; display: flex; & > div { flex-grow: 1; }}`}
  }
`
