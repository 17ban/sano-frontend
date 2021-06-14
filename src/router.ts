import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('~/layout/default.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('~/pages/home.vue'),
        },
      ],
    },
    {
      path: '/node',
      component: () => import('~/layout/default.vue'),
      children: [
        {
          path: ':nid',
          component: () => import('~/pages/node.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('~/pages/err.vue'),
    },
  ],
})

export default router
