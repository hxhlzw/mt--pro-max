<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: KnowledgeType
}>()
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import { getConsultList } from '@/services/consult'
import type { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/consult'

const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  // 加载更多
  const res = await getConsultList(params.value)
  console.log(res)

  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
