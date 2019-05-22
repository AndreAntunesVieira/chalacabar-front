import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import TextsModel from 'models/TextsModel'

export default class VipPage extends Component {
  static async getInitialProps() {
    const result = await new TextsModel().find('vip')
    return { content: result.value }
  }

  render = () => (
    <MainView>
      <PageTitle>Reservas | Chalaça Bar Ipanema</PageTitle>
      <Section>
        <h1>Camarotes</h1>
        <img src="/img/layout/camarotes-vagos.jpg" />
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
