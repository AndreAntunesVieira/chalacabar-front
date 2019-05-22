import React from 'react'
import styled from 'styled-components'

const PhotoNotification = () => (
  <Container>
    Aqui é publicada uma seleção de fotos de cada evento, a cobertura completa está na pagina do Facebook <a className="link-style" href="https://www.facebook.com/Chala%C3%A7a-Fotos-152256858665625/" target="_blank">Chalaça Fotos</a>.
  </Container>
)

const Container = styled.div`
  padding: 8px;
  a{
    color: white;
    font-weight: bold;
  }
`

export default PhotoNotification
