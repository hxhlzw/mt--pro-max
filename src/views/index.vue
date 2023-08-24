<template>
  <div>
    <p>{{ store.user }}</p>
    <button @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">
      登录
    </button>
    <button @click="store.delUser()">退出</button>
  </div>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="default">默认按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button>
  <div class="cc"></div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { Button as VanButton } from 'vant'
const store = useUserStore()
</script>

<style lang="scss" scoped>
.cc {
  width: 200px;
  height: 40px;
  background-color: aqua;
}
</style>
