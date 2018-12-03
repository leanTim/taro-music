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
import defaultCmtIcon from '../../image/cm2_play_icn_cmt@2x.png'
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

import {transformMsToMin, formatCmtCount} from '../../utils'

// components
import LyricPlaying from '../../components/LyricPlaying'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '东风破'
  }

  constructor (props) {
    super(props)
    this.state = {
      bgImgUrl: '',
      songUrl: '',
      isPaused: false,
      duration: 0,
      current: 0,
      lyric: '',
      isShowLyric: false,
      isShowDefaultBg: true,
      commentTotalCount: 0
    }
  }

  componentWillMount () {
    
  }

  async componentDidMount () {
    this.id = this.$router.params.id
    await this.requestSongDetail(this.id)
    await this.requestSongUrl(this.id)
    this.requestCommentTotalCount(this.id)
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
      dt: duration,
      al: {
        picUrl: bgImgUrl = ''
      },
      ar: [
        {
          name: artist
        }
      ]
    } = songs[0]
    this.songName = name
    this.artist = artist
    Taro.setNavigationBarTitle({
      title: name
    })
    this.setState({
      bgImgUrl,
      duration
    })
  }

  async requestSongUrl (id) {
    const {data} = await request({
      url: 'song/url',
      data: {
        id
      }
    })
    const {
      url
    } = data[0]
    this.setState({
      songUrl: url
    }, () => {
      this.audioPlayer()
    })
  }

  async requestCommentTotalCount (id) {
    const {total} = await request({
      url: 'comment/music',
      data: {
        limit: 0,
        offset: 0,
        id
      }
    })

    this.setState({
      commentTotalCount: total
    })
  }

  async requestLyric (id) {
    const data = await request({
      url: 'lyric',
      data: {
        id
      }
    })
    this.setState({
      lyric: data.lrc.lyric
    })
  }

  audioPlayer () {
    const backgroundAudioManager = Taro.getBackgroundAudioManager()
    const songUrl = this.state.songUrl
    backgroundAudioManager.src = songUrl
    backgroundAudioManager.title = this.songName
    backgroundAudioManager.epname = this.songName
    backgroundAudioManager.singer = this.artist
    backgroundAudioManager.coverImgUrl = this.state.bgImgUrl
    backgroundAudioManager.onPlay(() => {
      this.audioPlay()
    })
    backgroundAudioManager.onPause(() => {
      this.audioPause()
    })
    backgroundAudioManager.onTimeUpdate(() => {
      this.setState({
        current: Math.round(parseFloat(backgroundAudioManager.currentTime * 1000))
      })
    })
    this.audioManager = backgroundAudioManager

  }

  audioPlayPause () {
    this.audioManager.paused ? this.audioPlay() : this.audioPause()
  }

  audioPlay () {
    this.audioManager.play()
    this.setState({
      isPaused: false
    })
  }

  audioPause () {
    this.audioManager.pause()
    this.setState({
      isPaused: true
    })
  }

  handleSlideChange (e) {
    this.audioManager.seek(e.detail.value / 1000)
  }

  async handleyric () {
    if (!this.state.lyric.length) await this.requestLyric(this.id)
    this.setState({
      isShowLyric: true
    })
  }

  hideLyric (isShowLyric) {
    this.setState({
      isShowLyric
    })
  }

  handleBgLoad () {
    this.setState({
      isShowDefaultBg: false
    })
  }

  navigateToComment () {
    Taro.navigateTo({
      url: `/pages/songComment/index?id=${this.id}`
    })
  }

  render () {
    const playPausedIcon = this.state.isPaused ? startIcon : pausedIcon
    const durationStr = transformMsToMin(this.state.duration)
    const currentStr = transformMsToMin(this.state.current)
    const cmtIcn = this.state.commentTotalCount ? cmtIcon : defaultCmtIcon
    const formatedCmtCount = formatCmtCount(this.state.commentTotalCount)

    return (
      <View className={isPaused ? 'playing-page paused' : 'playing-page'}>
        {isShowDefaultBg && <Image className='page-bg' mode='aspectFill' src={playingBg} />}
        <Image className='page-bg' mode='aspectFill' src={this.state.bgImgUrl} onLoad={this.handleBgLoad.bind(this)} />
        <View className={`playing-main ${isShowLyric ? ' show-lyric' : ''}`}>
          <View className='phonograph'>
            <View className='tool flex-center'>
              <Image className='img' mode='aspectFill' src={aag} /> 
            </View>
            <View className='panel flex-center' onClick={this.handleyric.bind(this)}>
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
              <View className='comments info-icon' onClick={this.navigateToComment.bind(this)}>
                {commentTotalCount && <Text className='count'>{formatedCmtCount}</Text>}
                <Image className='info-img' mode='aspectFill' src={cmtIcn} />
              </View>
              <View className='more info-icon'>
                <Image className='info-img' mode='aspectFill' src={moreIcon} />
              </View>
            </View>

            <View className='progress'>
              <Text className='start-time'>{currentStr}</Text>
              <Slider 
                activeColor='#BB2C08' 
                max={duration} 
                value={current} 
                blockSize='12' 
                className='slider' 
                onChange={this.handleSlideChange.bind(this)} />
              <Text className='end-time'>{durationStr}</Text>
            </View>

            <View className='controls'>
              <View className='loop ctrl-icon'>
                <Image src={loopIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='prev ctrl-icon'>
                <Image src={prevIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='start-pause ctrl-icon'>
                <Image src={playPausedIcon} mode='aspectFill' onClick={this.audioPlayPause.bind(this)} className='ctrl-img' />
              </View>
              <View className='next ctrl-icon'>
                <Image src={nextIcon} mode='aspectFill' className='ctrl-img' />
              </View>
              <View className='playing-list ctrl-icon'>
                <Image src={listIcon} mode='aspectFill' className='ctrl-img' />
              </View>
            </View>
          </View>
          {this.state.isShowLyric && 
          <LyricPlaying onHideLyric={this.hideLyric.bind(this)} current={Math.round(this.state.current / 1000)} lyric={this.state.lyric} />}
        </View>
      </View>
    )
  }
}
