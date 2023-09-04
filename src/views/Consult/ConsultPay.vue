<script setup lang="ts">
import { createConsultOrder, getConsultOrderPayUrl, getConsultOrderPre } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { onMounted, ref } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import router from '../../router/index'

const store = useConsultStore()

const agree = ref(false)
// 获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
const initPayInfo = async () => {
  const payInfoRes = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  store.setCoupon(payInfoRes.data.couponId as string)
  console.log('payInfoRes', payInfoRes)
  payInfo.value = payInfoRes.data
}
initPayInfo()

// 获取患者详情信息
const patientInfo = ref<Patient>()
const initPatientInfo = async () => {
  const patientRes = await getPatientDetail(store.consult.patientId as string)
  patientInfo.value = patientRes.data
}
initPatientInfo()
// 支付弹框
const show = ref(false)
// 支付方法 1 支付宝支付 0 微信支付
const paymentMethod = ref()
const loading = ref(false)
const orderId = ref('')
const submit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  try {
    loading.value = true
    const orderRes = await createConsultOrder(store.consult)
    console.log('orderRes', orderRes)
    orderId.value = orderRes.data.id

    // TODO 清空pinia中存储的订单状态
    store.clear()

    show.value = true
    store.clear()
  } finally {
    loading.value = false
  }
}

// 发起支付
const handlePay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')
  const payres = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = payres.data.payUrl
}

const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then((res) => {
      // on confirm
      return false
    })
    .catch((error) => {
      // on cancel
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
;() => {
  if (
    !store.consult.type ||
    !store.consult.illnessDesc ||
    !store.consult.illnessTime ||
    !store.consult.patientId ||
    !store.consult.depId
  ) {
    return showConfirmDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  initPayInfo()
  initPatientInfo()
}
</script>

<template>
  <div class="consult-pay-page" v-if="payInfo">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientInfo?.name} | ${patientInfo?.genderValue} | ${patientInfo?.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar
      @click="submit"
      :loading="loading"
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
    />
  </div>

  <van-action-sheet
    :before-close="onClose"
    :close-on-popstate="false"
    v-model:show="show"
    title="选择支付方式"
  >
    <div class="pay-type">
      <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="handlePay">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 0 0 50px 0;
}

::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}

.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    color: var(--cp-primary);
  }
}

.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }

    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}

.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}

.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;

  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }

  .desc {
    flex: 1;

    > span {
      display: block;
      color: var(--cp-tag);

      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}

.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  .van-cell {
    align-items: center;

    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }

    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }

  .btn {
    padding: 15px;
  }
}
</style>
