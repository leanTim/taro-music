import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Image, Navigator, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import headSetIcon from '../../image/video.png'

import './index.less'

export default class MvItem extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    mvMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    mvMsg: {
      name: '',
      playCount: 0,
      imgUrl: '',
      artist: '',
      id: 0
    }
  }

  navigateToDetail () {
    Taro.navigateTo({
      url: `/pages/mvPlaying/index?id=${this.props.mvMsg.id}`
    })
  }

  render () {
    const {
      name,
      imgUrl,
      artist,
      playCount
    } = this.props.mvMsg
    return (
      <View className='mv-item' onClick={this.navigateToDetail.bind(this)}>
        <View className='cover-view'>
          <Image className='poster' src={imgUrl} mode='aspectFill' />
          <View className='cover'>
            <Image className='cover-img' src={headSetIcon} />{playCount}
          </View>
        </View>
        <View className='name text'>{name}</View>
        <View className='artist text'>{artist}</View>
      </View>
    )
  }
}
