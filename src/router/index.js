import {createRouter, createWebHistory} from 'vue-router';
import {useAuth} from '../composables/useAuth';
import {usePermissions} from '../composables/usePermissions';
import MainPage from '../views/MainPage.vue';
import PageManagement from '../views/PageManagement.vue';
import PageLogin from '../views/PageLogin.vue';
import PageNotFound from '../views/PageNotFound.vue';
import PageDashBoard from '../views/PageDashBoard.vue';
import {READ_BOOKING, READ_MANAGEMENT, UPDATE_MANAGEMENT} from '../constants/permissions';
import {LAYOUT_EMPTY} from '../constants/layouts';


const routes = [
  {
    path: '/',
    component: MainPage,
    name: 'home',
    meta: {
      isRequireLogin: false,
      title: 'Главная',
      isVisible: false,
      permission: [],
      layout: LAYOUT_EMPTY,
    },
  },
  {
    path: '/nav',
    component: PageDashBoard,
    name: 'nav',
    meta: {
      isRequireLogin: true,
      permission: [READ_BOOKING],
      titleShort: 'навигация',
      icon: 'chair-rolling',
      title: 'Навигация',
      isVisible: true,
    },
  },
  {
    path: '/office',
    component: PageManagement,
    name: 'bookingManagement',
    meta: {
      isRequireLogin: true,
      permission: [READ_MANAGEMENT, UPDATE_MANAGEMENT],
      titleShort: 'мeнеджмент',
      icon: 'briefcase-edit-outline',
      title: 'Менеджмент офисов',
      isVisible: true,
    },
  },
  {
    path: '/login',
    component: PageLogin,
    name: 'login',
    meta: {
      permission: [],
      isRequireLogin: false,
      title: 'Страница входа',
      layout: LAYOUT_EMPTY,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
    name: 'notFound',
    meta: {
      isRequireLogin: false,
      title: '404 Not Found',
      permission: [],
      layout: LAYOUT_EMPTY,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const {user} = useAuth();
  const {can} = usePermissions();
  if (to.meta.isRequireLogin && !user.value.isAuthorized) {
    next({
      name: 'login',
      query: {nextUrl: to.path},
    });
    return;
  }
  if (to.meta.permission && !can(...to.meta.permission)) {
    next({path: from.fullPath});
    return;
  }
  next();
});

export default router;
