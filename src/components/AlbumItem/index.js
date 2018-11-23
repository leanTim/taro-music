import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import headSetIcon from '../../image/p0.png'
import './index.less'

import {formatRecommendListCount} from '../../utils'

export default class AlbumItem extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    albumMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    albumMsg: {
      name: '真好',
      playCount: 1231123,
      imgUrl: ''
    }
  }

  navigateToDetail () {
    Taro.navigateTo({
      url: `/pages/songsListDetail/index?id=${this.props.albumMsg.id}`
    })
  }

  render () {
    const {
      name,
      playCount,
      imgUrl
    } = this.props.albumMsg

    return (
      <View className='album-item' onClick={this.navigateToDetail.bind(this)}>
        <View className='cover-wrap'>
          <Image mode='aspectFill' className='poster' src={imgUrl} />
          <View className='cover'>
            <Image className='cover-img' src={headSetIcon} />{formatRecommendListCount(playCount)}
          </View>
        </View>
        <Text className='desc'>{name}</Text>
      </View>
    ) 
  }
}
