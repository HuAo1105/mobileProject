<template>
  <div>
    <van-nav-bar title="登陆" />
    <van-row>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          right-icon="question-o"
          placeholder="请输入手机号"
          class="mobile"
          style="padding-left: 62px"
        />
        <van-col span="16">
          <van-field
            v-model="user.code"
            type="text"
            class="code"
            placeholder="请输入验证码"
            required
            style="padding-left: 62px"
          />
        </van-col>
        <van-col span="8">
          <span class="btn-code">获取验证码</span>
        </van-col>
      </van-cell-group>
    </van-row>
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
        mobile: '',
        code: ''
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
.mobile:before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/shouji.png");
  background-size: 100%;
  left: 24px;
}
.code:before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/yanzhengma.png");
  background-size: 100%;
  left: 24px;
}
.code:after {
  position: relative;
  content: "";
  display: block;
  border-left: 1px solid #eee;
  background-color: #eee;
  height: 24px;
  right: 20px;
}
.btn-code {
  display: block;
  width: 110px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-top: 7px;
  border-radius: 25px;
  background-color: #ededed;
}
.login {
  padding: 20px;
  .btn {
    width: 100%;
    background-color: #6db4fb;
    color: #fff;
  }
}
</style>
