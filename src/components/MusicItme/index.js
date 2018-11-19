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
    musicMsg: PropTypes.object.isRequired
  }

  handlerClick (id, e) {
    console.log(id, e)
    Taro.navigateTo({
      url: `/pages/playing/index?id=${id}`
    })
  }

  render () {
    const {
      name,
      artist,
      imgUrl,
      id
    } = this.props.musicMsg
    return (
      <View className='music-item' onClick={this.handlerClick.bind(this, id)}>
        <Image className='poster' src={imgUrl} mode='aspectFill' />
        <View className='name text'>{name}</View>
        <View className='artist text'>{artist}</View>
      </View>
    )
  }
}