import { ref, reactive, onMounted } from 'vue';
import { defineStore } from 'pinia';
import APIService from '../services/APIService.js'

export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([]);
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });
    const recetas = ref([]);

    onMounted(async () => {
        const { data: {drinks} } = await APIService.obtenerCategorias();
        categorias.value = drinks;
    });

    async function obtenerRecetas() {
        const data = await APIService.buscarRecetas(busqueda.nombre, busqueda.categoria)
        console.log(data);
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas
    }
});