import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import TextsRequests from 'requests/TextsRequests'

export default class VipPage extends Component {
  static getInitialProps() {
    return new TextsRequests().find('vip').then(({ value }) => ({ content: value }))
  }

  render = () => (
    <MainView>
      <PageTitle>Reservas | Chalaça Bar Ipanema</PageTitle>
      <Section>
        <h1>Camarotes</h1>
        <img src="/img/layout/camarotes-novos.jpg" alt="Esquema dos camarotes" />
        <div id="entenda" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </Section>
    </MainView>
  )
}

const Section = styled.section`
  padding: 8px;
  b,
  h1,
  a {
    color: #f19816;
  }
  img {
    width: 100vw;
    height: 142.777778vw;
    margin: 0 -8px;
    max-width: none;
    @media (min-width: 1012px) {
      width: 720px;
      height: 1028px;
      margin: 0 auto;
      display: block;
    }
  }
  #entenda {
    padding-top: 45px;
  }
`
