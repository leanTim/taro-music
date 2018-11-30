import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'
import CommentItem from '../CommentItem'
import Loading from '../Loading'

export default class CommentPage extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    hotCmts: PropTypes.array.isRequired,
    allCmts: PropTypes.array.isRequired,
    isShowTitle: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  static defaultProps = {
    hotCmts: {}
  }

  render () {
    const hotCmts = this.props.hotCmts
    const allCmts = this.props.allCmts
    const isLoading = this.props.isLoading
    const isShowTitle = this.props.isShowTitle

    return (
      <View className='comment-page'>
        {hotCmts.length > 0 && isShowTitle && <Text className='reply-type'>热门评论</Text>}
        {
          hotCmts.map(comment => <CommentItem key={comment.commentId} cmtMsg={comment} />)
        }
        {allCmts.length > 0 && isShowTitle && <Text className='reply-type'>全部评论&nbsp;{this.state.total}</Text>}
        {
          allCmts.map((comment) => <CommentItem key={comment.commentId} cmtMsg={comment} />)
        }
        {isLoading && <Loading />}
      </View>
    )
  }
}
