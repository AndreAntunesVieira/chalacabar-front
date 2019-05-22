import React, { Component } from 'react'
import { getResolutionImageUrl } from 'helpers/Images'

export default class ResponsiveImage extends Component{
  state = { src: null }

  componentDidMount(){
    const src = getResolutionImageUrl(this.props.mobile, this.props.desk)
    this.setState({ src })
  }

  render = () => <img src={this.state.src} alt={this.props.alt} />
}
