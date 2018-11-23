# taro-music
a weapp
[api](https://github.com/Binaryify/NeteaseCloudMusicApi)

* 发现一个taro比mpvue好的地方(微信小程序)
    taro在页面 `onUnload` 的时候 会把所有的 `state` 设置为初始值
    mpvue需要手动设置 `onLoad` 或者 `onUnload` 的时候`Object.assign(this.$data, this.$options.data())`
    要是不初始化数据，**列表页 -> 详情页** mpvue编译后的小程序表现是 **先显示上一个详情页的数据 - loading - 显示正常数据** 
    页面看起来起来会闪一下
