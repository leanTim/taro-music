import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'
import beforeSupIcon from '../../image/xg.png'
import supedIcon from '../../image/xl.png'

export default class CommentItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasBeReplied: false
    }
  }

  static propTypes = {
    cmtMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    cmtMsg: {}
  }

  componentWillMount () {
    const {
      beRepliedContent,
      beRepliedNickname
    } = this.props.cmtMsg
    this.setState({
      hasBeReplied: beRepliedContent.length > 0 && beRepliedNickname.length > 0
    })
  }

  render () {
    const {
        content,
        likedCount,
        time,
        avatarUrl,
        nickname,
        beRepliedContent,
        beRepliedNickname,
    } = this.props.cmtMsg
    return (
      <View className='comment-item'>
        <Image src={avatarUrl} className='avatar' />

        <View className='cmt-container'>
          <View className='cmt-info'>
            <View className='user-name'>
              <Text>{nickname}</Text>
              <Text className='time'>{time}</Text>
            </View>
            <View className='sup-wrap'>
              <Text className='sup-count'>{likedCount}</Text>
              <Image className='sup-icon' src={beforeSupIcon} />
            </View>
          </View>
          <View className='cmt-content'>
            {this.state.hasBeReplied && <View>回复 <Text className='reply-name'>@{beRepliedNickname}:</Text></View>}
            <Text>{content}</Text>
            {this.state.hasBeReplied && <View className='reply-content'>
              <View className='reply-name'>@{beRepliedNickname}:</View>
              <Text className='content'>{beRepliedContent}</Text>
            </View>}
          </View>
        </View>
      </View>
    )
  }
}
