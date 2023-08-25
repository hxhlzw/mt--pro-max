<template>
  <div class="-page">
    <van-nav-bar
      left-arrow
      :title="props.title"
      @click-left="onClickLeft"
      :right-text="rightText"
      @click-right="onClickRight"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickLeft = () => {
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
// 父传子
const props = defineProps({
  title: String,
  rightText: String
})

const emits = defineEmits(['click-right'])
const onClickRight = () => {
  emits('click-right')
}
</script>

<style lang="scss" scoped></style>
