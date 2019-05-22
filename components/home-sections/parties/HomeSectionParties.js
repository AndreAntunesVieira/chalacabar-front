import React, { Component } from 'react'
import styled from 'styled-components'
import HomeSectionPartiesImage from 'components/home-sections/parties/HomeSectionPartiesImage'
import HomeSectionPartiesSelector from 'components/home-sections/parties/HomeSectionPartiesSelector'
import { isIos } from 'helpers/DeviceHelpers'

export default class HomeSectionParties extends Component {
  slider = React.createRef()
  state = { active: 0 }

  touchStartPosition = null
  touchStartTime = null
  touchMoved = 0

  componentDidMount() {
    this.interval = setInterval(this.next, 5000)
    const slider = this.slider.current
    slider.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    slider.addEventListener('touchmove', this.onTouchMove.bind(this), false)
    slider.addEventListener('touchend', this.onTouchEnd.bind(this), false)
  }

  onTouchStart = event => {
    clearInterval(this.interval)
    if (event.target.closest('.StopSliderPropagation')) return event.stopPropagation()
    this.touchMoved = 0
    this.scrollStartPosition = this.slider.current.scrollLeft
    this.touchStartPosition = event.changedTouches[0].clientX
    this.touchStartTime = new Date().getTime()
  }

  onTouchMove = event => {
    if (event.target.closest('.StopSliderPropagation')) return event.stopPropagation()
    this.touchMoved = this.touchStartPosition - event.changedTouches[0].clientX
    const left = this.scrollStartPosition + this.touchMoved
    this.slider.current.scrollTo({ left })
  }

  onTouchEnd = event => {
    this.interval = setInterval(this.next, 3000)
    if (event.target.closest('.StopSliderPropagation')) return event.stopPropagation()
    if (!this.touchMoved) return null
    const distance = (this.touchMoved * 100) / this.slider.current.clientWidth
    const time = new Date().getTime() - this.touchStartTime
    const delta = distance / time
    this.touchStartPosition = 0
    this.touchStartTime = 0
    if (delta > 0.05 || distance > 30) return this.rollOnTouchEnd(1)
    if (delta < -0.05 || distance < -30) return this.rollOnTouchEnd(-1)
  }

  async rollOnTouchEnd(step) {
    return this.rollTo(this.state.active + step, true)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  next = () => {
    let active = this.state.active + 1
    if (active >= this.props.parties.length) active = 0
    this.rollTo(active)
  }

  rollTo = active => {
    const slider = this.slider.current
    if(!slider) return null
    const left = slider.clientWidth * active
    this.smoothScroll(left)
    this.setState({ active })
  }

  smoothScroll = async (left, step = null) => {
    if (left < 0) return null
    if (!isIos()) return this.slider.current.scrollTo({ left, top: 0, behavior: 'smooth' })
    const slider = this.slider.current
    const diff = left - slider.scrollLeft
    if (Math.abs(diff) <= 10) return slider.scrollTo({ left })
    if (!step) step = diff / 15
    slider.scrollTo({ left: slider.scrollLeft + step })
    await delay(10)
    return this.smoothScroll(left, step)
  }

  onMouseEnter = () => {
    clearInterval(this.interval)
  }

  onMouseLeave = () => {
    this.interval = setInterval(this.next, 3000)
  }

  onClick = active => () => this.rollTo(active)

  get style() {
    const partiesCount = this.props.parties.length
    const style = {}
    style.width = `calc(100vw * ${partiesCount})`
    style.maxWidth = `calc(1012px * ${partiesCount})`
    return style
  }

  render = () => (
    <Container>
      <div className="parties" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="parties-mask" ref={this.slider}>
          <div className="parties-slider" style={this.style}>
            {this.props.parties.map((party, key) => (
              <HomeSectionPartiesImage {...party} key={key} sufix="descricao" />
            ))}
          </div>
        </div>
        <div className="parties-banner-selector">
          {this.props.parties.map((party, key) => (
            <HomeSectionPartiesSelector key={key} active={this.state.active === key} onClick={this.onClick(key)} />
          ))}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.section`
  .parties-mask {
    width: 100vw;
    max-width: 1012px;
    height: calc(140vw + 68px);
    overflow: hidden;
    @media (min-width: 1012px) {
      height: 500px;
    }
  }

  .parties-slider {
    height: calc(140vw + 62px);
    display: flex;
    @media (min-width: 1012px) {
      height: 500px;
    }
  }

  .parties {
    display: block;
    position: relative;
    min-width: 100vw;
    flex-direction: column;
    overflow: hidden;
    height: calc(140vw + 92px);
    @media (min-width: 1012px) {
      height: 500px;
      min-width: 1012px;
    }
  }

  .parties-banner-selector {
    position: absolute;
    bottom: 0;
    text-align: center;
    left: 0;
    z-index: 21;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`
