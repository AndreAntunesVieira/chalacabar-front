import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PageTitle from 'components/common/PageTitle'
import MainView from 'components/views/MainView'
import Button from 'components/common/Button'
import BirthDateForm from 'components/forms/BirthDateForm'
import BirthDatesModel from 'models/BirthDateModel'
import { showNotification } from 'store/NotificationStore'
import TextsModel from 'models/TextsModel'

class HomePage extends Component {
  static getInitialProps() {
    return new TextsModel().find('birthdate').then(({ value }) => ({ content: value }))
  }

  state = { active: false }

  onSubmit = (e, data) => {
    const target = e.target
    return new BirthDatesModel()
      .submit({ ...data })
      .then(() => {
        this.props.showNotification({ text: 'Lista de aniversário salva com sucesso', color: 'success' })
        return target.reset()
      })
      .catch(e => {
        this.props.showNotification({
          text: 'Erro ao tentar salvar lista de aniversário, tente novamente mais tarde',
          color: 'danger',
        })
      })
  }

  render = () => (
    <MainView>
      <PageTitle>Comemore seu aniversário | Chalaça Bar Ipanema</PageTitle>
      <Section active={this.state.active} dangerouslySetInnerHTML={{ __html: this.props.content }} />
      <Smooth>
        {!this.state.active && (
          <Button info onClick={() => this.setState({ active: !this.state.active })}>
            Ler todas as regras
          </Button>
        )}
      </Smooth>
      <SectionForm>
        <BirthDateForm onSubmit={this.onSubmit} />
      </SectionForm>
    </MainView>
  )
}

const Section = styled.section`
  padding: 8px;
  max-height: 200px;
  overflow: hidden;
  position: relative;
  transition: all ease 300ms;
  b,
  h1 {
    color: #f19816;
  }
  &:after {
    position: absolute;
    bottom: 0;
    content: '';
    margin-top: -80px;
    height: 80px;
    width: 100%;
    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(28, 28, 28, 1) 80%);
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(28, 28, 28, 1) 80%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(28, 28, 28, 1) 80%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6171703',GradientType=0 );
  }
  ${props => props.active && 'max-height: 2000px; &:after { display: none }'}
`

const Smooth = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
`

const SectionForm = styled.section`
  padding: 8px;
`

export default connect(
  null,
  { showNotification }
)(HomePage)
