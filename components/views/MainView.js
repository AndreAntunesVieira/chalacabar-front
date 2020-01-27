import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import A from 'components/common/A'
import { withRouter } from 'next/router'
import Notifications from 'components/common/Notifications'
import HeaderLinks from 'components/others/HeaderLinks'

class MainView extends Component {
  state = { open: false }

  toggle = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  }

  render = () => (
    <Container className={classNames('pt50', { ['sidebar-open']: this.state.open })}>
      <Header href="/" className="header-image">
        <img src="/img/logo/logo-2019-white-transparent.webp" height="38" alt="Logo Chalaça Bar" />
        <div className="header-hamburger" onClick={this.toggle}>
          <span />
        </div>
      </Header>
      {this.props.router.asPath !== '/' && this.props.router.asPath !== '/novo/' && (
        <GoBack href="/">
          <img src="/img/icons/ArrowLeftSvg.svg" />{' '}
        </GoBack>
      )}
      <HeaderLinks open={this.state.open} />
      <Content>{this.props.children}</Content>
      <Notifications />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  &:before {
    content: '';
    background-image: url(/img/bg.png);
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    position: absolute;
    z-index: -1;
    opacity: 0.3;
  }
`

const Header = styled(A)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  z-index: 30;
  background-color: #1c1c1c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  @media (min-width: 1200px) {
    padding: 8px 24px;
  }
  img {
    max-height: 30px;
    @media (min-width: 1200px) {
      position: absolute;
      left: calc(50% - 504px);
    }
  }
`

export default withRouter(MainView)

const GoBack = styled(A)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  img {
    display: block;
    content: '';
    background-image: url(/img/icons/ArrowLeftSvg.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
  }
`

const Content = styled.main`
  max-width: 1012px;
  margin: 0 auto;
`
