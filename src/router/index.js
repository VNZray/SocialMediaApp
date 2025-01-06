import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    // ----------------------------------------------------------------------------

    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/index.vue')
    }, 
    {
      path: '/home',
      name: 'Homepage',
      component: () => import('@/pages/home.vue')
    }, 
    {
      path: '/home/:userId',
      name: 'Home',
      component: () => import('@/pages/home.vue')
    }, 
    {
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('@/pages/profile.vue')
    }, 
    {
      path: '/profile/:userId',
      name: 'Profile',
      component: () => import('@/pages/profile.vue')
    }, 
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/register.vue')
    }, 

  ]
});

export default router;
