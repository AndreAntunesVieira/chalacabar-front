import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Notifications = ({ messages }) => {
  if (messages.length <= 0) return null
  return (
    <Container>
      {messages.map((message, key) => (
        <Message key={key} color={message.color}>
          {message.text}
        </Message>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 300px;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 48px);
  z-index: 40;
`

const Message = styled.div`
  padding: 8px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  ${props => getColor(props)}
`

const getColor = ({ color }) => {
  if (color === 'danger') return `background-color: rgba(255, 59, 0, 0.9);`
  if (color === 'success') return `background-color: rgba(0, 181, 0, 0.9);`
  if (color === 'warning') return `background-color: rgb(137, 162, 0);`
  if (color === 'info') return `background-color: rgba(0, 125, 162, 0.9);`
  return `background-color: #999;`
}

export default connect(state => ({
  messages: state.notification.messages || [],
}))(Notifications)
