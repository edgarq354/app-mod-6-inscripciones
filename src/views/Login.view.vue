<template>
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="login()">
            <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="tucorreo@ejemplo.com"
                    required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="********"
                    required>
            </div>
            <button type="submit" class="btn btn-success w-100">Entrar</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['setToken', 'setRol', 'setNombre']),
        login() {
            this.axios.get(process.env.VUE_APP_API_URL + '/usuarios?email=' + this.email)
                .then((response) => {
                    console.log(response);
                    if (response.data.length == 0) {
                        alert("Credenciales no validas, intente de nuevo!!!");
                    } else {
                        localStorage.setItem('rol', response.data[0].rol);
                        localStorage.setItem('nombre', response.data[0].nombre);
                        localStorage.setItem('token', 'xxxxxxxxxxxxxxxxxxxxxxxxxx');
                        this.setRol(response.data[0].rol);
                        this.setNombre(response.data[0].nombre);
                        this.setToken('xxxxxxxxxxxxxxxxxxxxxxxxxx');
                        this.$router.push('/');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>