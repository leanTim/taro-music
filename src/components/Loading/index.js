import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index.less'

export default class Loading extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='loading'>
        <View className='ld-container'>
          <Text>加载中...&nbsp;</Text>
          <View className='loading-wrap'>
            <View className='item item1'></View>
            <View className='item item2'></View>
            <View className='item item3'></View>
          </View>
        </View>
      </View>
    )
  }
}
