<template>
  <div class="-page">
    <cp-nav-bar right-text="登录" @click-right="$router.push('/login')"></cp-nav-bar>
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
