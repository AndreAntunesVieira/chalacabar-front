import React from 'react'
import styled from 'styled-components'
import { brDate } from 'helpers/Date'
import A from 'components/common/A'

const PhotoAlbum = ({ date, title, slug, src, full }) => (
  <Container href={`/fotos/${slug}`} className="banner" full={full}>
    <img src={`https://f002.backblazeb2.com/file/chalacabar/fotos/${src}`} alt={`Foto da festa do dia ${date}`} />
    <div>
      {getTitle(title, date)}
    </div>
  </Container>
)

const Container = styled(A)`
  img {
    width: calc(100vw - 48px);
    height: 57.3vw;
    margin-bottom: 8px;
    object-fit: contain;
    @media (min-width: 1012px){
      width: 272px;
      height: 156px;
    }
  }
  ${props =>
    props.full &&
    `
    margin: 8px -8px;
    padding: 0;
    border: none;
  `}
`

export default PhotoAlbum

function getTitle(title, date){
  if(!title) return ''
  if(!date) return title
  return `${brDate(date)} - ${title}`
}
