<template>
  <div>
    <van-nav-bar title="登陆" />
    <van-row>
      <ValidationObserver ref='loginForm'>
        <van-cell-group>
          <!-- required表示必填项
          name 表示提示的文本
          v-slot为 获取校验结果数据 -->
          <ValidationProvider name='手机号' rules='required|phone' v-slot='{ errors }'>
            <van-field
              v-model="user.mobile"
              required
              clearable
              right-icon="question-o"
              placeholder="请输入手机号"
              class="mobile"
              style="padding-left: 62px"
              :error-message='errors[0]'
            />
          </ValidationProvider>
          <van-col span="16">
            <!-- required|max:6代表最大值为6 -->
            <ValidationProvider name='验证码' rules='required|max:6' v-slot='{ errors }'>
              <van-field
                v-model="user.code"
                type="text"
                class="code"
                placeholder="请输入验证码"
                required
                style="padding-left: 62px"
                :error-message='errors[0]'
              />
              <!-- errors[0]在这里是一个动态值，因为name属性会影响该提示 -->
            </ValidationProvider>
          </van-col>
          <van-col span="8">
            <span class="btn-code">获取验证码</span>
          </van-col>
        </van-cell-group>
      </ValidationObserver>
    </van-row>
    <div class="login">
      <van-button type="info" class="btn" @click="onLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import login from '@/api/user'
import { setItem } from '@/utils/storage'
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
      // 表单验证
      // 获取表单 this.$refs.loginForm 返回的是promise对象
      const trueOrFalse = await this.$refs.loginForm.validate()
      // loading
      if (!trueOrFalse) {
        // 如果自定义校验为false就直接return
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登陆中'
      })
      try {
        // 不用toast.clear()也可以，因为success和fail自带清除
        let { data } = await login(this.user)
        // toast.clear()
        this.$toast.success('登陆成功')
        // console.log(data)
        this.$store.commit('setUser', data.data)
        setItem('user', data.data)
        this.$router.push('/')
      } catch (error) {
        // toast.clear()
        if (error.response && error.response.status === 400) {
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
