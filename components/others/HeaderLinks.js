import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import A from 'components/common/A'
import { withRouter } from 'next/router'

const HeaderLinks = ({ open }) => (
  <Container open={open}>
    <HeaderLink href="/" label="Home" pattern="^/$" />
    <HeaderLink href="/fotos" label="Fotos" />
    <HeaderLink href="/agenda" label="Agenda completa" />
    <HeaderLink href="/aniversarios" label="Aniversários" />
    <HeaderLink href="/reservas" label="Mesas e Camarotes" />
  </Container>
)

const HeaderLink = withRouter(({ href, label, pattern, router }) => {
  const regExp = pattern ? pattern : `^${href}`
  const active = new RegExp(regExp).test(router.asPath)
  return (
    <A href={href} className={classNames({ active })}>
      {label}
    </A>
  )
})

export default HeaderLinks

const Container = styled.aside`
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100% - 50px);
  background-color: #1c1c1d;
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
    font-family: Arial, sans-serif;
    font-size: 13px;
    letter-spacing: 0.9px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    .fontsReady & {
      font-family: 'Allerta Stencil', sans-serif;
    }
    &:hover {
      background-color: rgba(60, 160, 160, 0.5);
      color: black;
    }
    &.active:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 5px;
      background-image: url(/img/disco.gif);
    }
    &:last-child {
      border-bottom-color: transparent;
    }
    @media (min-width: 1200px) {
      border-bottom: 1px solid #1c1c1d;
      padding: 8px 16px;
      transition: all ease 500ms;
      &:hover {
        background: none;
        color: rgba(255, 255, 255, 0.8);
        border-bottom-color: rgba(60,160,160,1);
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
