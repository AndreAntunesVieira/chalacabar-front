import React, { Component } from 'react'
import delay from 'timeout-as-promise'
import styled from 'styled-components'
import classNames from 'classnames'
import { getResolutionImageUrl } from 'helpers/Images'

export default class ResponsiveImage extends Component {
  state = { autoload: this.props.autoload }
  ref = React.createRef()

  componentDidMount() {
    this.ref.current.onload = this.onLoad
    this.loadImageFromResolution(this.state.autoload)
  }

  componentWillReceiveProps = ({ autoload }) => this.loadImageFromResolution(autoload)

  loadImageFromResolution = autoload => {
    if (!autoload) return null
    const src = getResolutionImageUrl(this.props.mobile, this.props.desk)
    this.setState({ src })
    delay(1500).then(this.onLoad)
  }

  onLoad = () => this.setState({ loaded: true })

  render = () => (
    <Image
      ref={this.ref}
      src={this.state.src}
      alt={this.props.alt}
      className={classNames(this.props.className, { loaded: this.state.loaded })}
    />
  )
}

ResponsiveImage.defaultProps = {
  autoload: true,
}

const Image = styled.img`
  opacity: 0;
  transition: all ease 150ms;
  &.loaded {
    opacity: 1;
  }
`
