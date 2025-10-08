import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WeatherView from '@/views/WeatherView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil - WeatherApp'
      }
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView,
      meta: {
        title: 'Recherche météo - WeatherApp'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Dashboard - WeatherApp'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Mettre à jour le titre de la page
  document.title = (to.meta.title as string) || 'WeatherApp'
  next()
})

export default router
