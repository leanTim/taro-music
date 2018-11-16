import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class MusicItem extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    musicMsg: {
      name: '黑白键',
      artist: '何洁',
      imgUrl: ''
    }
  }

  static propTypes = {

  }

  render () {
    const {
      name,
      artist,
      imgUrl
    } = this.props.musicMsg
    return (
      <View className='music-item'>
        <Image className='poster' src={imgUrl} mode='aspectFill' />
        <View className='name text'>{name}</View>
        <View className='artist text'>{artist}</View>
      </View>
    )
  }
}