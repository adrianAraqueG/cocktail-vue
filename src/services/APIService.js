import api from "../lib/axios.js";

export default {
    obtenerCategorias(){
        return api('/list.php?c=list');
    },
    buscarRecetas({nombre, categoria}) {
        return api(`/filter.php?c=${categoria}&i=${nombre}`)
    }
}