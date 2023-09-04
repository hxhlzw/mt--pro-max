<template>
  <div class="consult-page">
    <cp-nav-bar title="问诊记录"></cp-nav-bar>
    <van-tabs sticky>
      <van-tab title="极速问诊">
        <ConsultList :type="ConsultType.Fast"></ConsultList>
      </van-tab>
      <van-tab title="找医生">
        <ConsultList :type="ConsultType.Doctor"></ConsultList>
      </van-tab>
      <van-tab title="开药问诊">
        <ConsultList :type="ConsultType.Medication"></ConsultList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ConsultType } from '@/enums'
import ConsultList from './components/ConsultList.vue'
</script>

<style lang="scss" scoped>
.consult-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
