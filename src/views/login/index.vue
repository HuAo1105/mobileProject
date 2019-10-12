<template>
  <div>
    <van-nav-bar
      title="登陆"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        type="text"
        label="验证码"
        placeholder="请输入验证码"
        required
      />
    </van-cell-group>
    <div class="login">
      <van-button type="info" class="btn" @click="onLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/api/request'
export default {
  name: 'LoginIndex', // 写一个name，为了在调试工具中方便找到
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        let { data } = await request({
          url: '/app/v1_0/authorizations',
          method: 'post',
          data: this.user
        })
        this.$toast.success('登陆成功')
        console.log(data)
      } catch (error) {
        if (error.reponse && error.reponse.status === 400) {
          this.$toast.fail('手机号或者验证码有误')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .login {
    padding: 20px;
    .btn {
      width: 100%;
      background-color: #6db4fb;
      color: #fff;
    }
  }
</style>
