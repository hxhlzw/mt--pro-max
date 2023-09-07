import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/user/consult/:id',
      name: 'detail',
      component: () => import('../views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/order/pay/result',
      component: () => import('@/views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/order/logistics/:id',
      component: () => import('@/views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
    },
    {
      path: '/order/:id',
      component: () => import('@/views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/order/pay',
      component: () => import('@/views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/user/consult',
      name: 'consult',
      component: () => import('../views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' },
          component: () => import('../views/Home/index.vue')
        },
        {
          path: '/article',
          name: 'article',
          meta: { title: '健康百科' },

          component: () => import('../views/Article/index.vue')
        },
        {
          path: '/notify',
          name: 'notify',
          meta: { title: '消息中心' },

          component: () => import('../views/Notify/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          meta: { title: '我的' },
          component: () => import('../views/User/index.vue')
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   NProgress.start()
// })
// router.afterEach((to) => {
//   // 修改标题
//   document.title = `149优医问诊-${to.meta.title || ''}`
//   NProgress.done()
// })
export default router
