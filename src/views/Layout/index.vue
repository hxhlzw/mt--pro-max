<template>
  <div class="-page"></div>
  <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item replace to="/home">
      <template #icon="{ active }">
        <cp-icon :name="`home-index-${active ? 'active' : 'default'}`" />
      </template>
      首页</van-tabbar-item
    >
    <van-tabbar-item replace to="/article" icon="search">
      <template #icon="{ active }">
        <cp-icon :name="`home-article-${active ? 'active' : 'default'}`" />
      </template>
      健康百科</van-tabbar-item
    >
    <van-tabbar-item replace to="/notify" icon="search"
      >消息中心
      <template #icon="{ active }">
        <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="search"
      >我的
      <template #icon="{ active }">
        <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
