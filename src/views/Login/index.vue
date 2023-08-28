<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单 -->
    <van-form autocomplete="off" @submit="hanleLogin">
      <van-field
        v-model="loginForm.mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号码"
        type="tel"
      />
      <van-field
        v-if="isPass"
        v-model="loginForm.password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <van-field v-else placeholder="短信验证码" v-model="code" :rules="codeRules">
        <template #button>
          <span class="btn-send" @click="send">{{
            time > 0 ? time + 's后再次发送' : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码?</a>
      </div>
    </van-form>

    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import cpIcon from '@/components/cp-icon.vue'

import { loginPost, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const isPass = ref(true)
const show = ref(false)
const code = ref('')
const loginForm = ref({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})

const time = ref(0)
let timeId: number = 0

const send = async () => {
  if (time.value > 0) return
  // 调用接口
  const codeRes = await sendMobileCode(loginForm.value.mobile, 'login')
  console.log('codeRes', codeRes)

  showToast('发送成功')
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
  }, 1000)
}

const agree = ref<boolean>(false)
const hanleLogin = async () => {
  if (!agree.value) return showToast('请勾选我已同意')

  const loginRes = isPass.value
    ? await loginPost(loginForm.value.mobile, loginForm.value.password)
    : await loginByMobile(loginForm.value.mobile, code.value)

  showToast(loginRes.data.code)
  store.setUser(loginRes.data.token)
  router.push((route.query.returnUrl as string) || '/user')
  showToast('登录成功')
}
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}

.login {
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 15px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .van-checkbox {
    a {
      color: var(--cp-primary);
      padding: 0 5px;
    }
  }
}

.btn-send {
  color: var(--cp-primary);

  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
