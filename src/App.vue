<template>
  <header>
    <h1> <router-link to="/">Cursos.Com</router-link></h1>
    <nav>
      <router-link v-if="isLogin && tieneAutorizacion(['administrador'])" to="/usuarios">Usuarios </router-link>
      <router-link v-if="isLogin && tieneAutorizacion(['administrador','registro'])" to="/estudiantes">Estudiantes</router-link>
      <router-link v-if="isLogin && tieneAutorizacion(['administrador'])" to="/docentes">Docentes</router-link>
      <router-link v-if="isLogin && tieneAutorizacion(['administrador'])" to="/cursos">Cursos</router-link>
      <router-link v-if="isLogin && tieneAutorizacion(['administrador','registro'])" to="/inscripciones">Inscripción</router-link> 
      <router-link v-if="!isLogin" to="/login">Login</router-link>
      
    </nav>

  </header>
  <div v-if="isLogin" style="padding: 5px 10px; background-color: white;">
    {{ getNombre }} | {{ getRol }} | [ <a @click="logout()">Salir</a> ]
  </div>

  <div class="contenedor-principal">

    <router-view />
  </div>

  <footer>
    <p>&copy; 2025 Instituto Cursos.Com. Todos los derechos reservados.</p>
  </footer>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'AppView',
  data() {
    return {

    }
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    ...mapActions(['clearToken', 'setRol']),
    logout() {
      localStorage.removeItem('rol');
      localStorage.removeItem('token');
      this.clearToken();
      this.setRol('');
      this.$router.push('/login');
    },
    tieneAutorizacion(roles){
        return roles.includes(this.getRol);
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['rol']),
    ...mapGetters(['isLogin', 'getRol', 'getNombre']),
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f4;
  color: #2c3e50;
  line-height: 1.6;
}

header {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 1.5rem;
  color: #1abc9c;
}

nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
}

footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

.contenedor-principal {
  padding: 30px 20px;
  min-height: 100vh;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav a {
    margin: 0.5rem 0 0 0;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .contenedor-principal {
    padding: 20px 10px;
  }
}
</style>
