import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Video, Text } from '@tarojs/components'
import './index.less'

import request from '../../utils/request.js'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      playCount: 0,
      artistName: '',
      desc: '',
      introduce: '',
      publishTime: '2010-01-01',
      shareCount: 0,
      poster: '',
      commentCount: 0,
      sourceSrc: '',
      tabsTitle: [
        {
          title: '详情',
          id: 'detail'
        },
        {
          title: '评论',
          id: 'comments'
        },
        {
          title: '相关mv',
          id: 'related'
        }
      ],
      currentTab: 'detail' // detail comments related
    }
  }

  componentWillMount () {
    this.mvId = this.$router.params.id
    this.requestMvDetail()
    this.requestEffectMv()
    // console.log(this.$router.params.id)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async requestMvDetail () {
    const {data} = await request({
      url: 'mv/detail',
      data: {
        mvid: this.mvId
      }
    })
    this.getFormateData(data)
  }

  async requestEffectMv () {
    const {data} = await request({
      url: 'mv/url',
      data: {
        id: this.mvId
      }
    })
    this.setState({
      sourceSrc: data.url
    })
  }

  getFormateData (obj) {
    const {
      name,
      playCount,
      artistName,
      desc,
      briefDesc: introduce,
      publishTime,
      shareCount,
      cover: poster,
      commentCount
    } = obj
    this.setState({
      name,
      playCount,
      artistName,
      desc,
      introduce,
      publishTime,
      shareCount,
      poster,
      commentCount
    })
  }

  test (e) {
    this.setState({
      currentTab: e.currentTarget.id
    })
    console.log(e)
  }

  render () {
    return (
      <View className='mv-playing'>
        <Video
          className='video'
          src={sourceSrc}
          controls
          autoplay
          poster={poster}
         />
         <View className='toggle-bar'>
          <View className='bar-header'>
            {
              tabsTitle.map((item, index) => {
                return (
                  <View key={index} onClick={this.test.bind(this)} id={item.id} className='bar-name'>
                    <Text className={item.id === this.state.currentTab ? 'current text' : 'text'}>{item.title}</Text>
                  </View>
                )
              })
            }
          </View>
         </View>
      </View>
    )
  }
}

