import React, { Component } from 'react'

export default class DangerousHTML extends Component{
  componentDidCatch(){
    return null
  }
  render(){
    return <div dangerouslySetInnerHTML={{ __html: this.props.children }} />
  }
}
