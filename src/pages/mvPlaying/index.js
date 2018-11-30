import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Video, Text } from '@tarojs/components'
import './index.less'

import request from '../../utils/request.js'

import Detail from './components/Detail'
import CommentPage from '../../components/CommentPage'

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
      limit: 20,
      total: 0,
      hotComments: [],
      allComments: [],
      isLoading: true,
      offset: 0,
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

  async requestComments () {
    this.setState({
      isLoading: true
    })

    const data = await request({
      url: 'comment/mv',
      data: {
        id: this.mvId,
        limit: this.state.limit,
        offset: this.state.offset
      }
    })

    this.addPage()
    this.setState((prevState) => {
      return ({
        total: data.total,
        allComments: prevState.allComments.concat(this.formatComments(data.comments)),
        hotComments: prevState.hotComments.concat(this.formatComments(data.hotComments)),
        isLoading: false
      })
    })
  }


  addPage () {
    this.setState({
      offset: this.state.offset + 1
    })
  }

  formatComments (comments) {
    let result = []
    comments && comments.map((comment) => {
      let {
        commentId,
        content,
        likedCount,
        time,
        user: {
          avatarUrl,
          nickname,
          userID
        },
        beReplied: [{
          beRepliedCommentId: beRepliedCommentId = 0,
          content: beRepliedContent = '',
          user: {
            nickname: beRepliedNickname = '',
            userId: beRepliedUserId = 0
          } = {}
        } = {}]
      } = comment

      result.push({
        commentId,
        content,
        likedCount,
        time,
        avatarUrl,
        nickname,
        userID,
        beRepliedCommentId,
        beRepliedContent,
        beRepliedNickname,
        beRepliedUserId
      })
    })
    return result
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

  toggleTab (e) {
    if (e.currentTarget.id === 'comments' && this.state.offset === 0) {
      this.requestComments()
    }
    this.setState({
      currentTab: e.currentTarget.id
    })
  }

  render () {
    const mvMsg = {
      name: this.state.name,
      playCount: this.state.playCount,
      artistName: this.state.artistName,
      publishTime: this.state.publishTime,
      desc: this.state.desc
    }

    const isShowTitle = !(this.state.isLoading && this.state.offset === 0)

    const curTab = this.state.currentTab
    let tabComtent = null
    if (curTab === 'detail') {
      tabComtent = <Detail mvMsg={mvMsg}/>
    } else if (curTab === 'comments') {
      tabComtent = <CommentPage 
                      hotCmts={this.state.hotComments} 
                      allCmts={this.state.allComments} 
                      isShowTitle={isShowTitle}
                      isLoading={this.state.isLoading} />
    }

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
                  <View key={index} onClick={this.toggleTab.bind(this)} id={item.id} className='bar-name'>
                    <Text className={item.id === this.state.currentTab ? 'current text' : 'text'}>{item.title}</Text>
                  </View>
                )
              })
            }
          </View>
          <View className='bar-content'>{tabComtent}</View>
         </View>
      </View>
    )
  }
}

