import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
Vue.use(require('vue-moment'))

function guardMyroute(to, from, next) {
  var isAuthenticated = localStorage.getItem('isAuthenticated')

  if (isAuthenticated) {
    next() // allow to enter route
  } else {
    next('/login') // go to '/login';
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: guardMyroute,
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/success',
      name: 'Success',
      beforeEnter: guardMyroute,
      component: () => import('./views/Success.vue')
    },
    {
      path: '/error',
      name: 'Error',
      beforeEnter: guardMyroute,
      component: () => import('./views/Error.vue')
    },
    {
      path: '/faktury/:id',
      name: 'Invoice',
      beforeEnter: guardMyroute,
      component: () => import('./views/Invoice.vue')
    },
    {
      path: '/faktury',
      name: 'Faktury',
      beforeEnter: guardMyroute,
      component: () => import('./views/Faktury.vue')
    },
    {
      path: '/add-patient',
      name: 'AddPatient',
      beforeEnter: guardMyroute,
      component: () => import('./views/AddPatient.vue')
    },
    {
      path: '/rozliczenia/medycyna-pracy',
      name: 'Rozliczenia',
      beforeEnter: guardMyroute,
      component: () => import('./views/Rozliczenia.vue')
    },
    {
      path: '/rozliczenia/medycyna-pracy/:month',
      name: 'RozliczeniaMonth',
      beforeEnter: guardMyroute,
      component: () => import('./views/RozliczeniaMonth.vue')
    },
    {
      path: '/rozliczenia/medycyna-pracy/:month/firma/:firmaId',
      name: 'RozliczeniaFirma',
      beforeEnter: guardMyroute,
      component: () => import('./views/RozliczeniaFirma.vue')
    },
    {
      path: '/rozliczenia/specjalistyka',
      name: 'RozliczeniaSpecjalistyka',
      beforeEnter: guardMyroute,
      component: () => import('./views/RozliczeniaSpecjalistyka.vue')
    },
    {
      path: '/rozliczenia/specjalistyka/:pacjent',
      name: 'RozliczeniaPacjent',
      beforeEnter: guardMyroute,
      component: () => import('./views/RozliczeniaSpecjalistykaPacjent.vue')
    },
    {
      path: '/specjalistyka',
      name: 'Specjalistyka',
      beforeEnter: guardMyroute,
      component: () => import('./views/Specjalistyka.vue')
    },
    {
      path: '/specyfikacja/:id',
      name: 'Specyfikacja',
      beforeEnter: guardMyroute,
      component: () => import('./views/Specyfikacja.vue')
    },
    {
      path: '/medycyna-pracy',
      name: 'MedycynaPracy',
      beforeEnter: guardMyroute,
      component: () => import('./views/MedycynaPracy.vue')
    },
    {
      path: '/zarejestrowane-wizyty',
      name: 'ZarejestrowaneWizyty',
      beforeEnter: guardMyroute,
      component: () => import('./views/ZarejestrowaneWizyty.vue')
    }
  ]
})

export default router
