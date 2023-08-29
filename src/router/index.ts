import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

export default router
