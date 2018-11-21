import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import {parseLrc} from '../../utils'

import './index.less'

export default class LyricPlaying extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lyricObj: null,
      currentIndex: 0
    }
  }

  static propTypes = {
    lyric: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    onHideLyric: PropTypes.func.isRequired
  }

  static defaultProps = {
    lyric: '',
    current: 0
  }

  componentWillMount () {
    this.setState({
      lyricObj: parseLrc(this.props.lyric)
    }, () => {
      this.setState({
        currentIndex: this.updateCurrentIndex() > 0 ? this.updateCurrentIndex() - 1 : 0
      })
    })
  }

  componentWillUpdate () {
    this.setState({
      currentIndex: this.updateCurrentIndex() > 0 ? this.updateCurrentIndex() - 1 : 0
    })
  }

  updateCurrentIndex () {
    return this.state.lyricObj.now_lrc.findIndex(value => parseInt(value.lrc_sec) > this.props.current)
  }

  handleHideComp () {
    this.props.onHideLyric(false)
  }

  render () {
    return (
      <View className='lyric-playing' onClick={this.handleHideComp.bind(this)}>
        <View className='lyric-wrap' style={{transform: `translateY(calc(50% - ${this.state.currentIndex * 36}px)`}}>
          {this.state.lyricObj.now_lrc.map((lrc, index) => {
            return (
              <View key={index} className={this.state.currentIndex === index ? 'current' : ''}>
                <Text data-index={index} data-time={lrc.lrc_sec}>{lrc.lrc}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
