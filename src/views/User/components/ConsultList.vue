<template>
  <div class="consult-list-page">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        @on-delete="handleDeleteOrder"
        :item="item"
        v-for="(item, index) in orderList"
        :key="index"
      >
      </ConsultItem>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { getConsultOrderList } from '@/services/consult'
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { ref } from 'vue'
import { ConsultType } from '../../../enums'
import ConsultItem from './ConsultItem.vue'
const props = defineProps<{
  type: ConsultType
}>()
const pageParams = ref<ConsultOrderListParams>({
  current: 1,
  pageSize: 10,
  type: props.type
})

const loading = ref(false)
const finished = ref(false)

const orderList = ref<ConsultOrderItem[]>([])
const onLoad = async () => {
  let orderRes = await getConsultOrderList(pageParams.value)
  orderList.value?.push(...orderRes.data.rows)
  // 如果当前滚动的页码是总页码,加载完成
  if (pageParams.value.current < orderRes.data.pageTotal) {
    pageParams.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}

const handleDeleteOrder = (id: string | number) => {
  orderList.value = orderList.value.filter((item) => item.id !== id)
}
</script>

<style lang="scss" scoped></style>
