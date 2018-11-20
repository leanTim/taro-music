import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class LyricPlaying extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
  }

  static propTypes = {
    lyric: PropTypes.string.isRequired
    // mvMsg: PropTypes.object.isRequired
  }

  static defaultProps = {
    // lyric: ''
    // mvMsg: {
    //   name: '',
    //   playCount: 0,
    //   imgUrl: '',
    //   artist: ''
    // }
  }

  componentWillMount () { }

  componentDidMount () {
    console.log('comp did mount')
    console.log(this.props)
  }

  componentWillUnmount () { }

  render () {
    return (
      <View className='index'>
        <Text>{this.props.lyric}</Text>
      </View>
    )
  }
}

