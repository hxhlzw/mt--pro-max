<script setup lang="ts">
import { getConsultOrderPre } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { onMounted, ref } from 'vue'

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
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
    />
  </div>
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
</style>
