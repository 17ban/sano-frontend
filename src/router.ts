import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import("./page/nodes-page.vue")
    },
    {
      path: '/node/:nid',
      component: () => import("./page/nodes-page.vue")
    },
    {
      path: '/:catchAll(.*)',
      component: () => import("./page/err.vue")
    }
  ]
})

export default router
