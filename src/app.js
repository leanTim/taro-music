import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'

import Index from './pages/index'

import './app.less'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/playing/index',
      'pages/songComment/index',
      'pages/songsListDetail/index',
      'pages/mvPlaying/index'
    ],
    window: {
      backgroundTextStyle: '#fbfcfd',
      navigationBarBackgroundColor: '#BB2C08',
      navigationBarTitleText: 'Music',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      'color': '#aaa',
      'selectedColor': '#fff',
      'borderStyle': '#333',
      'backgroundColor': '#212121',
      list: [{
          pagePath: 'pages/index/index',
          text: '发现音乐',
          iconPath: './image/cm2_btm_icn_discovery.png',
          selectedIconPath: './image/cm2_btm_icn_discovery_prs.png'
        },{
          pagePath: 'pages/index/index',
          text: '发现音乐',
          iconPath: './image/cm2_btm_icn_music.png',
          selectedIconPath: './image/cm2_btm_icn_music_prs.png'
        },
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      // <Provider store={store}>
      <Index />
      // </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
