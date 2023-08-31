import { ref } from 'vue'

import { likeDoctor } from '@/services/consult'
import type { FollowType } from '@/types/consult'

export default function useFollowDoctor(type: FollowType = 'doc') {
  const loading = ref(false)
  const followDoctor = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await likeDoctor({ id: obj.id, type })
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, followDoctor }
}
