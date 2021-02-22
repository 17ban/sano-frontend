import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import("./view/nodes-page.vue")
    },
    {
      path: '/node/:nid',
      component: () => import("./view/nodes-page.vue")
    },
    {
      path: '/:catchAll(.*)',
      component: () => import("./view/err-page.vue")
    }
  ]
})

export default router
