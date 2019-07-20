import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitle from '../../components/common/PageTitle'
import MainView from '../../components/views/MainView'
import PhotosRequests from '../../requests/PhotosRequests'
import PhotoAlbum from '../../components/common/PhotoAlbum'
import Button from '../../components/common/Button'
import PhotoNotification from '../../components/common/PhotoNotification'

export default class Index extends Component {
  static getInitialProps({ req, query }) {
    const page = Number(query.pag || 1)
    return new PhotosRequests(req).all(page).then(photos => ({ photos, page }))
  }

  state = { ...this.props, maxPage: this.props.page, minPage: this.props.page, limit: 1000 }

  loadLess = event => {
    event.stopPropagation()
    event.preventDefault()
    const minPage = this.state.maxPage - 1
    this.setState({ minPage })
    new PhotosRequests().all(minPage).then(loadedPhotos => {
      const photos = [...loadedPhotos, ...this.state.photos]
      this.setState({ photos })
    })
  }

  loadMore = event => {
    event.stopPropagation()
    event.preventDefault()
    const maxPage = this.state.maxPage + 1
    this.setState({ maxPage })
    new PhotosRequests().all(maxPage).then(loadedPhotos => {
      const photos = [...this.state.photos, ...loadedPhotos]
      this.setState({ photos })
    })
  }

  get min() {
    if (this.state.minPage <= 1) return 1
    return this.state.minPage - 1
  }

  get max() {
    if (this.state.maxPage >= this.state.limit) return this.state.limit
    return this.state.maxPage + 1
  }

  render = () => (
    <MainView>
      <PageTitle>Fotos das festas anteriores | Chalaça Bar Ipanema</PageTitle>
      <Section>
        <h1>Fotos</h1>
        {this.state.minPage > 1 && (
          <Button full info onClick={this.loadLess} href={`/fotos?pag=${this.min}`}>
            Carregar festas anteriores
          </Button>
        )}
        {this.state.photos.map(album => (
          <PhotoAlbum {...album} key={album.slug} />
        ))}
        <PhotoNotification />
        {/*{this.state.maxPage < this.state.limit && (*/}
        {/*<Button full info onClick={this.loadMore} href={`/fotos?pag=${this.max}`}>*/}
        {/*Carregar mais fotos*/}
        {/*</Button>*/}
        {/*)}*/}
      </Section>
    </MainView>
  )
}

const Section = styled.section`
  padding: 8px;
  b,
  h1 {
    color: #f19816;
  }
  img {
    width: 100vw;
    margin: 0 -8px;
  }
`
