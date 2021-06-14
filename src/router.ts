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
          component: () => import('~/views/home.vue'),
        },
      ],
    },
    {
      path: '/node',
      component: () => import('~/layout/default.vue'),
      children: [
        {
          path: ':nid',
          component: () => import('~/views/node.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('~/views/err.vue'),
    },
  ],
})

export default router
