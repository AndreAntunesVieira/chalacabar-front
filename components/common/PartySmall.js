import React from 'react'
import styled from 'styled-components'
import { brDate } from 'helpers/Date'
import A from 'components/common/A'
import ResponsiveImage from 'components/common/ResponseiveImage'

const PartySmall = ({ date, title, slug, src2, src3 }) => (
  <Container href={`/agenda/${slug}`} className="banner">
    <ResponsiveImage mobile={src3} desk={src2} alt={title} />
    <div>{getTitle(title, date)}</div>
  </Container>
)

const Container = styled(A)`
  img {
    width: calc(100vw - 48px);
    height: 41vw;
    margin-bottom: 8px;
    object-fit: contain;
    @media (min-width: 1012px) {
      width: 100%;
      height: 406px;
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

export default PartySmall

function getTitle(title, date) {
  if (!title) return ''
  if (!date) return title
  return `${brDate(date)} - ${title}`
}
