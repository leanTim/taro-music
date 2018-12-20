import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.less'
import defaultCover from '../../image/cm2_default_recmd_list-ip@2x.png'
import headSetIcon from '../../image/p0.png'
import rightIcon from '../../image/cm2_list_detail_icn_arr@2x.png'
import defaultAvatar from '../../image/cm2_icn_userhead@2x.png'
import folderIcon from '../../image/cm2_list_detail_icn_fav_new@2x.png'
import cmtIcon from '../../image/cm2_list_detail_icn_cmt@2x.png'
import shareIcon from '../../image/cm2_list_detail_icn_share@2x.png'
import playAllBtn from '../../image/pl-playall.png'

import request from '../../utils/request.js'
import {formatRecommendListCount} from '../../utils'
import SongItem from '../../components/SongItem'
import Loading from '../../components/Loading'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      id: 0,
      coverImgUrl: '',
      commentCount: 0,
      shareCount: 0,
      subscribedCount: 0,
      name: '',
      avatarUrl: '',
      nickname: '',
      playCount: 0,
      trackCount: 0,
      songsList: [],
      isLoading: true
    }
  }

  componentWillMount () {
    this.setState({
      id: this.$router.params.id
    },() => {
      this.requestPlayListDetail()
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async requestPlayListDetail () {
    this.setState({
      isLoading: true
    })
    const {playlist} = await request({
      url: 'playlist/detail',
      data: {
        id: this.state.id
      }
    })
    this.formatPlayListMsg(playlist)
    const {tracks} = playlist
    this.setState({
      songsList: this.formatListData(tracks),
      isLoading: false
    })
  }

  formatPlayListMsg (obj) {
    const {
      coverImgUrl,
      commentCount,
      shareCount,
      subscribedCount,
      name,
      playCount,
      trackCount,
      creator: {
        avatarUrl,
        nickname
      } = {}
    } = obj

    this.setState({
      coverImgUrl,
      commentCount,
      shareCount,
      subscribedCount,
      name,
      playCount,
      avatarUrl,
      nickname,
      trackCount
    })
  }

  formatListData (list) {
    let result = []
    list.map((item) => {
      const {
        name: songName = '',
        id,
        ar: [{
          name: artistName = ''
        } = {}],
        al: {
          name: albumName = ''
        }
      } = item
      result.push({
        songName,
        artistName,
        albumName,
        id
      })
    })
    return result
  }

  render () {
    return (
      <View className='songlist-detail'>
        <View className='list-header'>
          
          <View style={{backgroundImage: `url(${this.state.coverImgUrl})`}} className='bg'></View>
          <View className='list-main'>
            <View className='list-cover'>
              <Image className='default-cover' src={this.state.coverImgUrl || defaultCover} />
              {this.state.playCount && <View className='cover-header'>
                <Image className='head-set' mode='aspectFill' src={headSetIcon} />{formatRecommendListCount(this.state.playCount)}
              </View>}
            </View>
            <View className='list-msg'>
              <Text>{this.state.name}</Text>
              <View className='author-msg'>
                <Image style={{backgroundImage: `url(${defaultAvatar})`}} className='avatar' src={this.state.avatarUrl} />
                <Text>{this.state.nickname}</Text>
                <Image className='icon-r' src={rightIcon} />
              </View>
            </View>
          </View>

          <View className='list-act'>
            <View className='act-item'>
              <Image className='img' src={folderIcon} />
              {this.state.subscribedCount > 0 && <Text className='num'>{this.state.subscribedCount}</Text>}
            </View>
            <View className='act-item'>
              <Image className='img' src={cmtIcon} />
              {this.state.commentCount > 0 && <Text className='num'>{this.state.commentCount}</Text>}
            </View>
            <View className='act-item'>
              <Image className='img' src={shareIcon} />
              {this.state.shareCount > 0 &&<Text className='num'>{this.state.shareCount}</Text>}
            </View>
          </View>
        </View>

        {!this.state.isLoading && <View className='list-detail'>
          <View className='flex-box'>
            <View className='flex-left'>
              <Image className='img' src={playAllBtn} />
            </View>
            <View className='flex-right'>
              <Text className='text name'>播放全部</Text>
              <Text className='artist text'>(共{this.state.trackCount}首)</Text>
            </View>
          </View>
          {
            this.state.songsList.map((songItem, index) => {
              return (
                <SongItem key={songItem.id} songMsg={songItem} index={index} />
              )
            })
          }
        </View>}
        {this.state.isLoading && <Loading />}
        
      </View>
    )
  }
}

