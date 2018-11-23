import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class SongItem extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    songMsg: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    songMsg: {},
    index: 0
  }

  navigateToPlaying () {
    Taro.navigateTo({
      url: `/pages/playing/index?id=${this.props.songMsg.id}`
    })
  }

  render () {
    const {
      index,
      songMsg
    } = this.props
    return (
      <View className='flex-box' onClick={this.navigateToPlaying.bind(this)}>
        <View className='flex-left'>
          <Text>{index + 1}</Text>
        </View>
        <View className='flex-right'>
          <View className='text name'>{songMsg.songName}</View>
          <View className='artist text'>{songMsg.artistName}-{songMsg.albumName}</View>
        </View>
      </View>
    ) 
  }
}
