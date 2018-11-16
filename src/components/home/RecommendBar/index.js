import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'

import './index.less'

export default class RecommendBar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // console.log(this.props.linkMsg)
  }

  render () {
    return (
      <View className='recommend-bar'>
        <View>
          <Image src={this.props.linkMsg.imgUrl} className='img-left' />推荐歌单
        </View>
        <View className='more'>
          更多>
        </View>
      </View>
    )
  }
}
