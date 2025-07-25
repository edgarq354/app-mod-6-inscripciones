<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form v-if="docentesList.length > 0" @submit.prevent="emitir($event)" novalidate>

            <div class="mb-3">
                <label class="form-label">Docente *</label>
                <select v-model="item.docenteId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in docentesList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input v-model="item.nombre" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
  
            <div class="mb-3">
                <label class="form-label">Descripción *</label>
                <input v-model="item.descripcion" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido, o no tiene el formato.</div>
            </div>
 

            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'CursosCrear',
    data() {
        return {
            title: 'Agregar Curso',
            item: {},
            docentesList: []
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
        this.obtenerDocentes();
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.

        emitir(event) {
            const form = event.target;

            // Si no es válido, muestra los errores con Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            // Si es válido, puedes enviar los datos
            this.$emit('created', this.item);
        },
        obtenerDocentes() {
            this.axios.get(process.env.VUE_APP_API_URL + '/docentes')
                .then((response) => {
                    this.docentesList = response.data;
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