<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Buscar por nombre</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por especie</span>
            <select v-model="filtroEspecie" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="tipo in tipos" :key="tipo" :value="tipo">
                    {{ tipo }}
                </option>
            </select>
        </div>
    </div>
   

    <div class="table-responsive">
        <table class="table table-bordered border-secondary">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">CURSO</th>
                    <th scope="col">ESTUDIANTE</th> 
                    <th scope="col">TIPO</th> 
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">MONTO</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.curso.nombre }}</td>
                    <td>{{ item.estudiante.nombre }}</td> 
                    <td>{{ item.tipo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.monto }} Bs</td>
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
                    <inscripciones-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></inscripciones-crear>
                    <inscripciones-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></inscripciones-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import InscripcionesCrear from './InscripcionesCrear.vue';
import InscripcionesEditar from './InscripcionesEditar.vue';
export default {
    name: 'InscripcionesList',
    data() {
        return {
            title: 'Inscripciones',
            items: [],
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            textoAbuscar: '',
            tipos: [
                "PAGO",
                "GRATIS"
            ],
            filtroEspecie: ''
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        InscripcionesCrear,
        InscripcionesEditar
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
 
            let filtro = "";
            if (this.filtroEspecie !== "") {
                filtro = "&tipo=" + this.filtroEspecie;
            }

            this.axios.get(process.env.VUE_APP_API_URL + '/inscripciones?_expand=estudiante&_expand=curso' + filtro  )
                .then((response) => {
                    const resultado = response.data.filter(inscripcion =>
      inscripcion.estudiante.nombre.toLowerCase().includes(this.textoAbuscar.toLowerCase())|| 
      inscripcion.curso.nombre.toLowerCase().includes(this.textoAbuscar.toLowerCase()) 
    );
                    this.items = resultado;
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
            value.fecha = new Date().toISOString().split('T')[0];
            this.axios.post(process.env.VUE_APP_API_URL + '/inscripciones', value)
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
            this.axios.patch(process.env.VUE_APP_API_URL + '/inscripciones/' + value.id, value)
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
                this.axios.delete(process.env.VUE_APP_API_URL + '/inscripciones/' + value.id, value)
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