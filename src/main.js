import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importaciones axios
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios) // Configuración global de axios
.mount('#app')

// Configurar el interceptor para agregar el token de autorización en la cabecera de todas las solicitudes
axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
    return config;
});