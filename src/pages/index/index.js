import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, Navigator } from '@tarojs/components'
import './index.less'

// image
import personalFMIcon from '../../image/cm2_discover_icn_fm-ip6@2x.png'
import hotMusicIcon from '../../image/cm2_discover_icn_upbill-ip6@2x.png'
import recommendIcon from '../../image/cm2_discover_icn_recmd@2x.png'
import latestMusicIcon from '../../image/cm2_discover_icn_newest@2x.png'
import recommendMvIcon from '../../image/cm2_discover_icn_mv@2x.png'
import radioAnchorIcon from '../../image/cm2_discover_icn_radio@2x.png'

// personal component
import RecommendBar from '../../components/home/RecommendBar'
import AlbumItem from '../../components/AlbumItem'
import MusicItem from '../../components/MusicItme'
import MvItem from '../../components/MvItem'

// request
import request from '../../utils/request'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '发现音乐'
  }

  constructor (props) {
    super (props)
    this.state = {
      recommendList: [],
      latestMusicList: [],
      recommendMvList: [],
      radioAnchorList: [],
      bannerList: []
    }
  }

  async componentWillMount () {
    this.requestBanner()
    this.requestRecommendList()
    this.requestLatestMusicList()
    this.requestRecommendMvList()
    this.requestRadioAnchor()
  }
  componentDidMount () {
    // console.log(View)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // banner

  async requestBanner () {
    const {banners} = await request({
      url: 'banner'
    })
    this.setState({
      bannerList: this.formatBannerData(banners)
    })
  }

  // 推荐歌单
  async requestRecommendList () {
    const {result} = await request({
      url: 'personalized',
      limit: 6
    })
    this.setState({
      recommendList: this.fromatAlbumData(result).filter((item, index) => index <= 5)
    })
  }

  // 最新音乐
  async requestLatestMusicList () {
    const {result} = await request({
      url: 'personalized/newsong'
    })
    // console.log(this.fromatLatestMusicData(result))
    this.setState({
      latestMusicList: this.fromatLatestMusicData(result).filter((item, index) => index <= 5)
    })
  }

  // 最新mv
  async requestRecommendMvList () {
    const {result} = await request({
      url: 'personalized/mv'
    })
    this.setState({
      recommendMvList: this.fromatAlbumData(result)
    })
  }

  // 主播电台
  async requestRadioAnchor () {
    const {result} = await request({
      url: 'personalized/djprogram'
    })
    this.setState({
      radioAnchorList: this.fromatAlbumData(result)
    })
  }

  formatBannerData (banners) {
    let formatList = []
    banners.map((banner) => {
      let {
        targetId: id,
        imageUrl: imgUrl
      } = banner

      formatList.push({
        id,
        imgUrl
      })
    })

    return formatList
  }

  fromatAlbumData (listData) {
    let formatList = []
    listData.map((item => {
      let {
        name,
        playCount: playCount = 0,
        picUrl: imgUrl,
        artistName: artist = '',
        id
      } = item
      formatList.push({
        name,
        playCount,
        imgUrl,
        artist,
        id
      })
    }))
    return formatList
  }

  fromatLatestMusicData (listData) {
    let formatList = []

    listData.map(item => {
      let {
        name,
        id,
        song: {
          album: {
            blurPicUrl: imgUrl,
            artists: [{
              name: artist
            }]
          }
        }
      } = item
      formatList.push({
        name,
        imgUrl,
        artist,
        id
      })
    })
    return formatList
  }

  render () {
    const recommendBarMsg = {
      imgUrl: recommendIcon,
      linkUrl: '',
      text: '推荐歌单'
    } // 推荐歌单图标和查看更多链接

    const latestMusicBarMsg = {
      imgUrl: latestMusicIcon,
      linkUrl: '',
      text: '最新音乐'
    }

    const recommendMvBarMsg = {
      imgUrl: recommendMvIcon,
      linkUrl: '',
      text: '推荐MV'
    }

    const radioAnchorBarMsg = {
      imgUrl: radioAnchorIcon,
      linkUrl: '',
      text: '主播电台'
    }

    return (
      <View className='index'>
        <Swiper interval='3000' 
          indicatorDots
          circular="true"
          autoplay 
          className='swiper'>
          {
            this.state.bannerList && this.state.bannerList.map((banner) => {
              return (
                <SwiperItem key={banner.id}>
                  <Image className='swiper-img' mode='aspectFill' src={banner.imgUrl}/>
                </SwiperItem>
              )
            })
          }
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
              <View className='img-wrap'>{new Date().getDate()}</View>
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
            <RecommendBar linkMsg={recommendBarMsg} />
            <View className='music-list'>
              {
                this.state.recommendList && this.state.recommendList.map((recommend, index) => {
                  return <AlbumItem key={index} albumMsg={recommend} />
                })
              }
            </View>

            <View className='latest-music-list'>
              <RecommendBar linkMsg={latestMusicBarMsg} />
              <View className='music-list'>
                {
                  this.state.latestMusicList && this.state.latestMusicList.map((latestMusic, index) => {
                    return <MusicItem key={index} musicMsg={latestMusic} />
                  })
                }
              </View>
            </View>

            <View className='recommend-mv-list'>
              <RecommendBar linkMsg={recommendMvBarMsg} />
              <View className='music-list'>
                {
                  this.state.recommendMvList && this.state.recommendMvList.map(((recommendMv, index) => {
                    return <MvItem className='test' key={index} mvMsg={recommendMv} />
                  }))
                }
              </View>

              <View className='radio-anchor-list'>
                <RecommendBar linkMsg={radioAnchorBarMsg} />
                <View className='music-list'>
                  {
                    this.state.radioAnchorList && this.state.radioAnchorList.map(((recommendMv, index) => {
                      return <MusicItem key={index} musicMsg={recommendMv} />
                    }))
                  }
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
