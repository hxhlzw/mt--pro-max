import { deleteOrder, getPrescriptionPic } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { showImagePreview, showToast } from 'vant'
import { getMedicalOrderDetail } from '@/services/order'
import type { MedicineResponseType, OrderDetailResponseType } from '@/types/order'
import { ref } from 'vue'
export default function useShowPrescription() {
  const showPrescription = async (id: string | number) => {
    const res = await getPrescriptionPic(id)
    if (res.data.id) {
      showImagePreview([res.data.url])
    }
  }

  return {
    showPrescription
  }
}
// 删除订单
export function useDeleteOrder(cb?: (id: string | number) => void) {
  const deleteLoading = ref(false)
  const handleDeleteOrder = async (item: ConsultOrderItem) => {
    deleteLoading.value = true
    try {
      await deleteOrder(item.id)
      // emits('on-delete', item.id)
      cb && cb(item.id)
      showToast('删除成功')
    } catch (error) {
      showToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }

  return {
    deleteLoading,
    handleDeleteOrder
  }
}
// 获取药品订单详情
export function useMedicineOrderDetail(id: string) {
  const item = ref<OrderDetailResponseType>()
  const initMedicineOrderDetail = async () => {
    const OrderDetailRes = await getMedicalOrderDetail(id)
    item.value = OrderDetailRes.data
  }
  initMedicineOrderDetail()
  return { item, initMedicineOrderDetail }
}
