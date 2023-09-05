import { cancelOrder, deleteOrder } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enums'
import { ref } from 'vue'
import { showToast } from 'vant'
// 封装取消订单逻辑
export default function useCancelOrder() {
  const loading = ref(false)
  const cancelConsultOrder = (item: ConsultOrderItem) => {
    loading.value = true
    cancelOrder(item.id)
      .then(() => {
        item.status = OrderType.ConsultCancel
        item.statusValue = '已取消'
        showToast('取消成功')
      })
      .catch(() => {
        showToast('取消失败')
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { loading, cancelConsultOrder }
}
