import React, { Component } from 'react'
import styled from 'styled-components'

class Select extends Component {
  render = () => (
    <Container success={this.props.success} warning={this.props.warning}>
      <label>{this.props.label}</label>
      <select name={this.props.name}>
        {this.props.children}
      </select>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 4px;
  padding: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  letter-spacing: 1px;
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  margin-bottom: 12px;
  background-color: ${props => colors(props)};
  label {
    display: block;
    width: 100%;
  }
  select {
    padding: 0 5px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    height: 27px;
    color: white;
    &:focus {
      outline-color: white;
    }
  }
`

const colors = ({ warning, success }) => {
  if (success) return '#2ECC71'
  if (warning) return '#d2b234'
  return '#005CB9'
}

export default Select
