import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, Navigator } from '@tarojs/components'
import './index.less'

// image
import personalFMIcon from '../../image/cm2_discover_icn_fm-ip6@2x.png'
import hotMusicIcon from '../../image/cm2_discover_icn_upbill-ip6@2x.png'
import recommendIcon from '../../image/cm2_discover_icn_recmd@2x.png'

// personal component
import RecommendBar from '../../components/home/RecommendBar'
import AlbumItem from '../../components/AlbumItem/index.js'

// request
import request from '../../utils/request'

import '@tarojs/async-await'
export default class Index extends Component {
  config = {
    navigationBarTitleText: '发现音乐'
  }

  constructor () {
    super ()
    this.state = {
      recommendList: []
    }
  }

  async componentWillMount () {
    const data = await request({
      url: 'personalized'
    })
    console.log(data)
  }
  componentDidMount () {
    // console.log(View)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const recommendBarList = {
      imgUrl: recommendIcon,
      linkUrl: ''
    } // 推荐歌单图标和查看更多链接

    return (
      <View className='index todos'>
        <Swiper interval='3000' indicatorDots autoplay className='swiper'>
          <SwiperItem>
            <Image className='swiper-img' mode='aspectFill' src='http://p1.music.126.net/yIbBqULjFgV-DTKf3FeW1g==/109951163666135368.jpg'/>
          </SwiperItem>
          <SwiperItem>
            <Image className='swiper-img' mode='aspectFill' src='http://p1.music.126.net/Y20Igu3wAWz0dAvVtG7GLg==/109951163666631402.jpg'/>
          </SwiperItem>
        </Swiper>

        <View className='recommend-wrap'>
          <View className='personal-fm'>
            <Navigator hover-class='none'>
              <View className='img-wrap'>
                <Image mode='aspectFill' className='img' src={personalFMIcon} />
              </View>
              <Text className='desc'>私人FM</Text>
            </Navigator>
          </View>
          <View className='recommend-daily'>
            <Navigator hover-class='none'>
              <View className='img-wrap'>15</View>
              <Text className='desc'>每日歌曲推荐</Text>
            </Navigator>
          </View>
          <View className='hot-music'>
            <Navigator hover-class='none'>
              <View className='img-wrap'>
                <Image mode='aspectFill' className='img' src={hotMusicIcon} />
              </View>
              <Text className='desc'>云音乐热歌榜</Text>
            </Navigator>
          </View>
        </View>

        <View className='container'>
          <View className='recommend-music-list'>
            <RecommendBar linkMsg={recommendBarList} />
            <View className='music-list'>
              <AlbumItem />
              <AlbumItem />
              <AlbumItem />
              <AlbumItem />
              <AlbumItem />
            </View>
          </View>

        </View>
      </View>
    )
  }
}
