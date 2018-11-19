import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Slider } from '@tarojs/components'
import './index.less'

import playingBg from '../../image/cm2_default_play_bg-ip6@2x.jpg'
import aag from '../../image/aag.png'
import panelBg from '../../image/play.png'
import loveIcon from '../../image/cm2_play_icn_love@2x.png'
import lovedIcon from '../../image/cm2_play_icn_loved@2x.png'
import dldIcon from '../../image/cm2_play_icn_dld@2x.png'
import cmtIcon from '../../image/cm2_play_icn_cmt_num@2x.png'
import moreIcon from '../../image/cm2_play_icn_more@2x.png'
import loopIcon from '../../image/cm2_icn_loop@2x.png'
import shuffleIcon from '../../image/cm2_icn_shuffle@2x.png'
import oneIcon from '../../image/cm2_icn_one@2x.png'
import prevIcon from '../../image/ajh.png'
import startIcon from '../../image/ajf.png'
import pausedIcon from '../../image/ajd.png'
import nextIcon from '../../image/ajb.png'
import listIcon from '../../image/cm2_icn_list@2x.png'

// request
import request from '../../utils/request'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '东风破'
  }

  constructor (props) {
    super(props)
    this.state = {
      bgImgUrl: ''
    }
  }

  componentWillMount () {
     this.requestSongDetail(this.$router.params.id)
  }

  componentDidMount () {
    console.log(this.$router.params)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async requestSongDetail (id) {
    const {songs} = await request({
      url: 'song/detail',
      data: {
        ids: id
      }
    })
    const {
      name,
      al: {
        picUrl: bgImgUrl = ''
      }
    } = songs[0]
    Taro.setNavigationBarTitle({
      title: name
    })
    this.setState({
      bgImgUrl
    })
    console.log(songs)
  }

  render () {
    const bgImgUrl = this.state.bgImgUrl ? this.state.bgImgUrl : playingBg
    return (
      <View className='playing-page'>
        <Image className='page-bg' mode='aspectFill' src={bgImgUrl} />
        <View className='playing-main'>
          <View className='phonograph'>
            <View className='tool flex-center'>
              <Image className='img' mode='aspectFill' src={aag} /> 
            </View>
            <View className='panel flex-center'>
              <Image className='bg' mode='aspectFit' src={panelBg} />
              <Image className='album-img' mode='aspectFill' src={bgImgUrl} />
            </View>
          </View>

          <View className='playing-operation'>
            <View className='playing-info'>
              <View className='love info-icon'>
                <Image className='info-img' mode='aspectFill' src={loveIcon} />
              </View>
              <View className='download info-icon'>
                <Image className='info-img' mode='aspectFill' src={dldIcon} />
              </View>
              <View className='comments info-icon'>
                <Image className='info-img' mode='aspectFill' src={cmtIcon} />
              </View>
              <View className='more info-icon'>
                <Image className='info-img' mode='aspectFill' src={moreIcon} />
              </View>
            </View>

            <View className='progress'>
              <Text className='start-time'>00:00</Text>
              <Slider activeColor='#BB2C08' max='1000' value='100' blockSize='12' className='slider' />
              <Text className='end-time'>03:00</Text>
            </View>

            <View className='controls'>
              <View className='loop ctrl-icon'>
                <Image src={loopIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='prev ctrl-icon'>
                <Image src={prevIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='start-pause ctrl-icon'>
                <Image src={startIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='next ctrl-icon'>
                <Image src={nextIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='playing-list ctrl-icon'>
                <Image src={listIcon} mode='aspectFill' className='ctrl-img' />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

