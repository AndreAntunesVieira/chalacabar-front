import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import PhotosRequests from 'requests/PhotosRequests'
import Button from 'components/common/Button'
import PhotoAlbum from 'components/common/PhotoAlbum'
import A from 'components/common/A'

export default class PhotoSlug extends Component {
  static getInitialProps({ req, query }) {
    const page = Number(query.pag || 1)
    const slug = query.album
    const photoSlug = query.photoSlug
    return new PhotosRequests(req).showAlbum(slug, page).then(album => {
      const photo = album.photos.find(p => p.src === photoSlug)
      const index = album.photos.findIndex(p => p.src === photoSlug)
      const max = album.photos.length - 1
      return { page, photoSlug: query.photoSlug, photo, index, max, ...album }
    })
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

  get prev() {
    return this.photo(-1)
  }

  get next() {
    return this.photo(1)
  }

  photo(direction = 1) {
    const photo = this.props.photos[this.props.index + direction]
    return photo && `/fotos/${this.props.slug}/${photo.src}`
  }

  render = () => (
    <MainView>
      <PageTitle>Fotos da festa {this.props.title} | Chalaça Bar Ipanema</PageTitle>
      <Section>
        <h1>
          <span style={{ fontSize: 16 }}>
            Foto {this.props.index + 1}/{this.props.max + 1} da festa:
          </span>
          <A style={{ textDecoration: 'none' }} href={`/fotos/${this.props.slug}`}>
            <b style={{ display: 'block' }}>{this.props.title}</b>
          </A>
        </h1>

        <Button full info href={this.prev} disabled={this.props.index <= 0}>
          Foto anterior
        </Button>
        <PhotoAlbum full {...this.props.photo} slug={`${this.props.slug}/${this.props.photo.src}`} />

        <Button full info href={this.next} disabled={this.props.index >= this.props.max} className="mb8">
          Próxima foto
        </Button>
        <Button full white href={`/fotos/${this.props.slug}`}>
          Voltar para o álbum
        </Button>
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
  @media (min-width: 1012px) {
    img {
      width: 100vw;
      height: 56.7vw;
    }
  }
`
