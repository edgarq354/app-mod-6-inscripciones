<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form @submit.prevent="emitir($event)" novalidate>
            <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input v-model="itemLocal.nombre" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Teléfono *</label>
                <input v-model="itemLocal.telefono" type="number" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Email *</label>
                <input v-model="itemLocal.email" type="email" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Dirección *</label>
                <input v-model="itemLocal.direccion" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'EstudiantesEditar',
    data() {
        return {
            title: 'Editar Estudiante',
            itemLocal: { ...this.item },
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
        emitir(event) {
            const form = event.target;

            // Si no es válido, muestra los errores con Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Si es válido, puedes enviar los datos
            this.$emit('updated', this.itemLocal);
        },
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
        item: {
            type: Object,
            required: true
        }
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>