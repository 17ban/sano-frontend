import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/node.vue'),
    },
    {
      path: '/node/:nid',
      component: () => import('./views/node.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('./views/err.vue'),
    },
  ],
})

export default router
