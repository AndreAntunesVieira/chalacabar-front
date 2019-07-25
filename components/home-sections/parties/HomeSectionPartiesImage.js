import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import A from 'components/common/A'
import Button from 'components/common/Button'
import ResponsiveImage from 'components/common/ResponseiveImage'

const HomeSectionPartiesImage = ({ slug, src3, src2, userAgent, active, title, ticketLink, hasList, sufix, autoload }) => (
  <Container active={active}>
    <A href={`/agenda/${slug}${sufix ? `#${sufix}` : ''}`}>
      <ResponsiveImage mobile={src3} desk={src2} alt={title} autoload={autoload} />
    </A>
    <div className="party-actions ph8">
      {hasList && (
        <Button warning full className="mv4" href={`/agenda/${slug}#lista`}>
          Colocar nome na lista
        </Button>
      )}
      {ticketLink && (
        <Button success full className="mv4" href={ticketLink} target="_blank">
          Comprar ingresso
        </Button>
      )}
    </div>
  </Container>
)

export default connect(state => ({
  userAgent: '', //state.app.userAgent
}))(HomeSectionPartiesImage)

const Container = styled.div`
  width: 100vw;
  max-width: 1012px;
  > a {
    width: 100vw;
    height: 140vw;
    display: block;

    @media (min-width: 1200px) {
      height: 422px;
    }
  }

  @media (min-width: 1200px) {
    height: 422px;
  }

  img {
    width: 100vw;
    height: 140vw;
    background-color: #333;
    @media (min-width: 1012px) {
      width: 1012px;
      height: 422px;
    }
  }

  .party-actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-direction: column;
    height: 64px;
  }
`
