<template>
  <div class="home">
    <van-nav-bar
      title="首页"
    />
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for='channel in channelList'
      :key='channel.id'>
      <!-- loading 控制上拉加载更多的loading效果
           finished  控制是否已加载结束
           finished-text 加载完底部显示的提示
           @load="onLoad" 上拉加载触发更多的事件
           列表组件会在页面初始化时自动调用load事件-->
        <van-list
          v-model="channel.loading"
          :finished="channel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in channel.articles"
            :key="item"
            :title="item"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channel } from '../../api/channel'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      // list: [],
      channelList: []
      // loading: false
      // finished: false
    }
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      let result = await channel()
      // console.log(result)
      result.data.data.channels.forEach(item => {
        // item为每一个频道
        item.articles = [] // 频道的文章列表，使得每一个频道下边都有一个文章列表,自己渲染自己的
        item.finished = false // 给每一个频道列表都加一个加载结束状态
        // 否则所有的频道列表都共用一个加载状态 当前加载完了，但是其他的频道还没加载finished就为true了
        item.loading = false // 存储更多的loading加载状态
      })
      this.channelList = result.data.data.channels
      // console.log(this.channelList)
    },
    onLoad () {
      const currentChannel = this.channelList[this.active]
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          currentChannel.articles.push(currentChannel.articles.length + 1)
        }
        // 设置本次加载状态结束
        // 每次数据加载完成，都会判断一下已加载的数据是否满屏
        // 如果没有的话，就继续onload

        // 当前频道加载结束
        currentChannel.loading = false

        // 数据全部加载完成
        if (currentChannel.articles.length >= 40) {
          // 当前频道加载完成
          currentChannel.finished = true
        }
      }, 1000)
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>

</style>
