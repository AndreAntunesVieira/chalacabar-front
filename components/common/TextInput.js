import React, { Component } from 'react'
import styled from 'styled-components'

class TextInput extends Component {
  state = { id: null }

  componentDidMount() {
    const rand = Math.round(Math.random() * 100)
    const id = this.props.id || `text-input-${rand}`
    this.setState({ id })
  }

  onChange = event => {
    if(this.props.normalizer) new this.props.normalizer(event.target).normalize()
    if(typeof this.props.onChange === 'function') return this.props.onChange(event)
  }

  render() {
    const { label, buttonLabel, success, warning, onClick, normalizer, onChange, ...props } = this.props
    return (
      <Container success={success} warning={warning} buttonLabel={buttonLabel}>
        <label htmlFor={this.state.id}>{label}</label>
        <input id={this.state.id} onChange={this.onChange} {...props} />
        {buttonLabel && <button onClick={onClick}>{buttonLabel}</button>}
      </Container>
    )
  }
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
  label{
    display: block;
    width: 100%;
  }
  input {
    padding: 0 5px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    height: 27px;
    color: white;
    &:focus{
      outline-color: white;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.18);
    }
  }
  button {
    width: 70px;
    height: 50px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.4);
    margin: -19px -4px -4px 2px;
    border: none;
    font-weight: bold;
    font-size: ${props => props.buttonLabel && props.buttonLabel.length > 5 ? '12px' : '16px'};
    color: ${props => colors(props)};
    &:focus{
      outline-color: ${props => outlines(props)};;
    }
  }
`

const colors = ({ warning, success }) => {
  if (success) return '#2ECC71'
  if (warning) return '#d2b234'
  return '#005CB9'
}

const outlines = ({ warning, success }) => {
  if (success) return '#1A8146'
  if (warning) return '#d2b234'
  return '#003875'
}
export default TextInput
