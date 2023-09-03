<script setup lang="ts">
import { ref, computed } from 'vue'

import { getAllDep } from '@/services/consult'
import type { SubDep, TopDep } from '@/types/consult'
const list = ref<TopDep[]>([])
const active = ref(0)
import { useConsultStore } from '@/stores'

const store = useConsultStore()
const initDepList = async () => {
  const res = await getAllDep()
  list.value = res.data
}
// 二级科室，注意：组件初始化没有数据 child 可能拿不到
initDepList()

const subDep = computed(() => list.value[active.value]?.child)
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) in list" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="store.setDep(ite.id)"
          to="/consult/illness"
          v-for="(ite, index) in subDep"
          :key="index"
          >{{ ite.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  // padding-top: 46px;
}

.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
