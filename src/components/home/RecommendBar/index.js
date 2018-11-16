import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class RecommendBar extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    linkMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    linkMsg: {
      text: '推荐歌单',
      imgUrl: ''
    }
  }

  componentDidMount () {
    // console.log(this.props.linkMsg)
  }

  render () {
    return (
      <View className='recommend-bar'>
        <View>
          <Image src={this.props.linkMsg.imgUrl} className='img-left' />{this.props.linkMsg.text}
        </View>
        <View className='more'>
          更多>
        </View>
      </View>
    )
  }
}
