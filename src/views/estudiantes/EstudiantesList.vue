<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <div class="table-responsive">
        <table class="table table-bordered border-secondary">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">TELEFONO</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">DIRECCION</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.telefono }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.direccion }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" @click="abrirModalParaEditar(item)">
                            <i class="bi bi-pen-fill"></i>
                        </button>
                        &nbsp;
                        <button type="button" class="btn btn-outline-danger" @click="eliminar(item)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal Bootstrap -->
    <div class="modal fade" id="modalAutoEditar" tabindex="-1" aria-labelledby="modalAutoEditarLabel" aria-hidden="true"
        ref="modalRef">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <estudiantes-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></estudiantes-crear>
                    <estudiantes-editar v-if="modalMode === 'editar'" @updated="modificar($event)"
                        :item="itemSeleccionado"></estudiantes-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import EstudiantesCrear from './EstudiantesCrear.vue';
import EstudiantesEditar from './EstudiantesEditar.vue';
export default {
    name: 'EstudiantesList',
    data() {
        return {
            title: ' Estudiantes',
            items: [],
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        EstudiantesCrear,
        EstudiantesEditar
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.$nextTick(() => {
            if (this.$refs.modalRef) {
                this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
            } else {
                console.error('No se encontró el ref modalRef');
            }
        });
        this.obtenerLista();
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.

        obtenerLista() {
            this.axios.get(process.env.VUE_APP_API_URL + '/estudiantes')
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaCrear() {
            this.modalMode = "crear";
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.show();

            } else {
                console.error('modalBootstrapInstance no está inicializado');
            }
        },
        cerrarModal() {
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.hide();
            }
        },
        nuevo(value) {
            this.axios.post(process.env.VUE_APP_API_URL + '/estudiantes', value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaEditar(item) {
            this.itemSeleccionado = { ...item };
            this.modalMode = "none";
            setTimeout(() => {
                if (this.modalBootstrapInstance) {
                    this.modalBootstrapInstance.show();
                    this.modalMode = "editar";
                } else {
                    console.error('modalBootstrapInstance no está inicializado');
                }
            })
        },
        modificar(value) {
            this.axios.patch(process.env.VUE_APP_API_URL + '/estudiantes/' + value.id, value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        eliminar(value) {
            if (confirm("¿Está seguro de eliminar este ítem?")) {
                this.axios.delete(process.env.VUE_APP_API_URL + '/estudiantes/' + value.id, value)
                    .then((response) => {
                        this.obtenerLista();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
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