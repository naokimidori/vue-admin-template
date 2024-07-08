import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 配置路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home/index.vue'),
    meta: {},
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
