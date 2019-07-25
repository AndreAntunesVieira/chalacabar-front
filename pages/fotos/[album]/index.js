import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import PhotosRequests from 'requests/PhotosRequests'
import Button from 'components/common/Button'
import PhotoAlbum from 'components/common/PhotoAlbum'

export default class AlbumPage extends Component {
  static getInitialProps({ req, query }) {
    const page = Number(query.pag || 1)
    const slug = query.album
    return new PhotosRequests(req).showAlbum(slug, page).then(album => ({ page, ...album }))
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
      <PageTitle>Fotos da festa {this.props.title} | Chalaça Bar Ipanema</PageTitle>
      <Section>
        <h1>Fotos</h1>
        {this.state.minPage > 1 && (
          <Button full info onClick={this.loadLess} href={`/fotos/${this.props.slug}?pag=${this.min}`}>
            Carregar festas anteriores
          </Button>
        )}
        {this.state.photos.map((photo, key) => (
          <PhotoAlbum {...photo} slug={`${this.props.slug}/${photo.src}`} key={key} />
        ))}
        {this.state.maxPage < this.state.limit && (
          <Button full info onClick={this.loadMore} href={`/fotos?pag=${this.max}`}>
            Carregar mais fotos
          </Button>
        )}
      </Section>
    </MainView>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 8px;
  b,
  h1 {
    color: #f19816;
  }
  h1 {
    width: 100%;
  }
  img {
    width: 100vw;
    margin: 0 -8px;
  }
  @media (min-width: 1012px) {
    flex-direction: row;
    justify-content: center;
    .banner {
      width: 272px;
      height: 156px;
    }
    img {
      width: 256px;
      height: 140px;
    }
  }
`
