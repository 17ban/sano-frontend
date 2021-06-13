import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

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

router.beforeEach(() => { NProgress.start() })
router.afterEach(() => {
  setTimeout(() => NProgress.inc(0.2), 25)
  setTimeout(() => NProgress.done(), 50)
})

export default router
