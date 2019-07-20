import React from 'react'
import styled from 'styled-components'
import A from 'components/common/A'

function ButtonComponent ({ href, warning, full, success, info, ...props }) {
  return <Selector {...props} href={href} />
}

function Selector (props) {
  if (props.href) return <A {...props} />
  return <button {...props} />
}

const Button = styled(ButtonComponent)`
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-self: center;
  font-size: 14px;
  min-height: 24px;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  transition: background 400ms ease-in-out;
  background-position: 100%;
  background-size: 400%;
  width: ${props => (props.full ? '100%' : 'auto')};

  &:hover,
  &.active {
    background-position: 0;
  }

  &:hover,
  &:focus {
    color: #fff;
    outline: 0;
  }
  &:active {
    transform: translateY(1px);
  }
  ${props => props.large && 'padding: 8px 16px'}
  ${props => colors(props)}
  ${props => props.disabled && 'opacity: 0.2;'}
`

const colors = ({ warning, success, info }) => {
  if (warning) {
    return `
    border-color: #d2b234;
    color: #fff;
    background-image: linear-gradient(45deg, #d2b234 50%, transparent 50%);`
  }
  if (success) {
    return `
    border-color: #2ECC71;
    color: #fff;
    background-image: linear-gradient(45deg, #2ECC71 50%, transparent 50%);`
  }
  if (info) {
    return `
    border-color: #005CB9;
    color: #fff;
    background-image: linear-gradient(45deg, #005CB9 50%, transparent 50%);`
  }
  return `
    border-color: white;
    color: #fff;
    background-image: linear-gradient(45deg, white 50%, transparent 50%);`
}
export default Button
