import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import A from 'components/common/A'
import { withRouter } from 'next/router'
import Notifications from 'components/common/Notifications'

class MainView extends Component {
  state = { open: false }

  toggle = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  }

  render = () => (
    <div className={classNames('pt50', { ['sidebar-open']: this.state.open })}>
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
      <Aside open={this.state.open}>
        <A href="/fotos">Fotos</A>
        <A href="/agenda">Agenda completa</A>
        <A href="/aniversarios">Aniversários</A>
        <A href="/reservas">Mesas e Camarotes</A>
      </Aside>
      <Content>{this.props.children}</Content>
      <Notifications />
    </div>
  )
}

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
    max-height: 42px;
    @media (min-width: 1200px) AND (max-width: 1366px) {
      position: absolute;
      left: 25%;
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

const Aside = styled.aside`
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100% - 50px);
  background-color: #1C1C1D;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  transform: translateX(100%);
  transition: all ease 300ms;
  opacity: 0;
  z-index: 30;

  a {
    color: rgba(255, 255, 255, 0.8);
    padding: 16px;
    font-weight: normal;
    text-decoration: none;
    transition: ease all 150ms;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    letter-spacing: .9px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      color: black;
    }
    &:last-child{
      border-bottom-color: transparent;
    }
    @media (min-width: 1200px){
      border-bottom: 1px solid #1C1C1D;
      padding: 8px 16px;
      &:hover {
        background: none;
        color: rgba(255, 255, 255, 0.8);
        border-bottom-color: #ff0400;
      }
    }
  }

  @media (min-width: 1200px) {
    opacity: 1;
    transform: translateX(0);
    flex-direction: row;
    height: 34px;
    top: 8px;
    background: none;
    left: auto;
    right: 24px;
    width: auto;
  }
  .sidebar-open & {
    transform: translateX(0);
    opacity: 1;
  }
`
