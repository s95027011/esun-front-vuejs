import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import ProductView from '../views/ProductView.vue';
// import LikeListView from '../views/LikeListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    // {
    //   path: '/likelist',
    //   name: 'likelist',
    //   component: LikeListView
    // }
  ]
});

export default router;
