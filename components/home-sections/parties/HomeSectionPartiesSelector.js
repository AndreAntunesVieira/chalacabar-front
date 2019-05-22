import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

const HomeSectionPartiesSelector = ({ active, onClick }) => (
  <StyledButtons className={classNames({ active })} onClick={onClick} />
)

export default HomeSectionPartiesSelector

const StyledButtons = styled.button`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid transparent;
  background-color: white;
  margin: 0 4px;
  transition: all 300ms ease;
  &.active {
    border-color: #fe0e00;
    background-color: transparent;
    transform: scale(1.1);
  }
  &:hover,
  &:focus {
    background-color: #9e0000;
  }
  &:active {
    transform: translateY(1px);
  }
`
