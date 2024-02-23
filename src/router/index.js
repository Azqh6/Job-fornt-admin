import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/test',
      name:'test',
      component:()=>import('@/views/test.vue')
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router
