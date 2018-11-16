import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator, Text } from '@tarojs/components'

import headSetIcon from '../../image/p0.png'

import './index.less'

export default class AlbumItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='album-item'>
        <View className='cover-wrap'>
          <Image mode='aspectFill' className='poster' src='http://p1.music.126.net/yW5R4MOB76naVKndRvyC-Q==/109951163624466165.jpg?param=200y200' />
          <View className='cover'>
            <Image className='cover-img' src={headSetIcon} />1234456779afsadfsadfsdafasfadsf
          </View>
        </View>
        <Text className='desc'>四十年间萦绕在我们耳边的经典金曲</Text>
      </View>
    ) 
  }
}
