import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuariosList from '@/views/usuarios/UsuariosList.vue'
import EstudiantesList from '@/views/estudiantes/EstudiantesList.vue'
import DocentesList from '@/views/docentes/DocenteList.vue'
import CursosList from '@/views/cursos/CursosList.vue'
import InscripcionesList from '@/views/inscripciones/InscripcionesList.vue'
import LoginView from '@/views/Login.view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosList,
    meta: { requiresAuth: true, role: ['administrador'] } 
  },
   {
    path: '/estudiantes',
    name: 'estudiantes',
    component: EstudiantesList,
    meta: { requiresAuth: true, role: ['administrador','registro'] } 
  },
  {
    path: '/docentes',
    name: 'docentes',
    component: DocentesList,
    meta: { requiresAuth: true, role: ['administrador'] } 
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: CursosList,
    meta: { requiresAuth: true, role: ['administrador'] } 
  },
  {
    path: '/inscripciones',
    name: 'inscripciones',
    component: InscripcionesList,
    meta: { requiresAuth: true, role: ['administrador','registro'] } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('rol') || ""; 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.meta.role.length > 0 && to.meta.role.includes(userRole)) {
      next();
    } else {
      next('/'); // Redirigir a la página de inicio si no tiene permisos
    }
  } else {
    next(); // Asegúrate de llamar a next()
  }
});


export default router
