import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/WeatherHomeView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/WeatherAboutView.vue') },
  {
    path: '/weather/:cityId',
    name: 'weatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFoundView.vue'),
  },
  { path: '/menu', name: 'menu', component: () => import('../views/MenuRecommendView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router


