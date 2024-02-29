import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/test",
      component:()=>import('../views/test.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path:'/',
      name:'首页',
      component: () => import('../views/Layout.vue'),
      children:[
        {
          path:"/home",
          name:'首页',
          component: () => import('../views/home/Home.vue')
        },
        {
          path:'/content/category',
          name:'分类管理',
          component:()=> import('../views/content/CategoryList.vue')
        },
        {
          path:'/content/question',
          name:'八股文管理',
          component:()=>import('../views/content/QuestionList.vue')
        },
        {
          path:'/setting/menu',
          name:'菜单管理',
          component:()=>import('../views/setting/MenuList.vue')
        },
        {
          path:'/setting/role',
          name:'角色管理',
          component:()=>import('../views/setting/RoleList.vue')
        },
        {
          path:'/setting/user',
          name:"用户管理",
          component:()=>import('../views/setting/UserList.vue')
        }
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
    let userInfo=sessionStorage.getItem("userInfo")
    if(!userInfo && to.path!=='/login'){
        router.push('/login')
    }
    next()
})


export default router
