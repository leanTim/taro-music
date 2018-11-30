import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class Detail extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    mvMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    mvMsg: {}
  }

  render () {
    const {
      name,
      playCount,
      artistName,
      publishTime,
      desc
    } = this.props.mvMsg
    console.log(this.props.mvMsg)

    return (
      <View className='detail-wrap'>
        <View className='mv-msg'>
          <Text className='name'>《{name}》</Text>
          <Text className='artist'>歌手：{artistName}</Text>
          <Text className='play-count'>播放：{playCount}</Text>
        </View>
        <View className='pub-msg'>
          <Text className='pub-time'>发行：{publishTime}</Text>
          <Text className='desc'>{desc}</Text>
        </View>
      </View>
    )
  }
}
