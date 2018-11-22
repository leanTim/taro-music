import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import request from '../../utils/request'

import Comment from '../../components/CommentItem/index.js'
import Loading from '../../components/Loading'

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
        {isShowTitle && <Text className='reply-type'>热门评论</Text>}
        {
          this.state.hotComments.map(comment => <Comment key={comment.commentId} cmtMsg={comment} />)
        }
        {isShowTitle && <Text className='reply-type'>全部评论&nbsp;{this.state.total}</Text>}
        {
          this.state.comments.map((comment) => <Comment key={comment.commentId} cmtMsg={comment} />)
        }
        {this.state.isLoading && <Loading />}
      </View>
    )
  }
}

