import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import request from '../../utils/request'

import CommentPage from '../../components/CommentPage'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '评论',
    onReachBottomDistance: 50
  }

  constructor (props) {
    super(props)
    this.state = {
      total: 0,
      comments: [],
      hotComments: [],
      limit: 20,
      offset: 0,
      id: 0,
      isLoading: true
    }
  }

  componentWillMount () { 
    // this.id = 
    this.setState({
      id: this.$router.params.id
    }, () => {
      this.requestComment(this.state.id)
    })
  }

  onReachBottom () {
    this.requestComment(this.state.id)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async requestComment (id) {
    this.setState({
      isLoading: true
    })
    const reqData = {
      id,
      limit: this.state.limit,
      offset: this.state.offset
    }
    const data = await request({
      url: 'comment/music',
      data: reqData
    })

    this.addPage()
    this.setState((prevState) => {
      return ({
        total: data.total,
        comments: prevState.comments.concat(this.formatComments(data.comments)),
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

  render () {
    const isShowTitle = !(this.state.isLoading && this.state.offset === 0)
    return (
      <View className='song-comments'>
        <CommentPage 
          hotCmts={this.state.hotComments} 
          allCmts={this.state.comments} 
          isShowTitle={isShowTitle}
          isLoading={this.state.isLoading} />
      </View>
    )
  }
}

