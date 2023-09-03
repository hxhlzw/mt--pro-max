import { ConsultType } from '@/enums'
import type { PartialConsult, FormConsult } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})
    // 设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 设置极速问诊类型
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 设置科室
    const setDep = (id: string) => (consult.value.depId = id)
    // 设置问诊信息(疾病描述,持续时间,是否就诊过,患者信息图片数组)
    const setIllness = (illness: FormConsult) => {
      // 设置疾病描述
      consult.value.illnessDesc = illness.illnessDesc
      // 疾病持续时间
      consult.value.illnessTime = illness.illnessTime
      // 设置是否就诊过
      consult.value.consultFlag = illness.consultFlag
      // 设置患者信息图片数组
      consult.value.pictures = illness.pictures
    }

    // 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 设置优惠券
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    // 清空记录
    const clear = () => (consult.value = {})
    return { consult, setType, setIllnessType, setDep, setIllness, setPatient, setCoupon, clear }
  },
  {
    persist: true
  }
)
