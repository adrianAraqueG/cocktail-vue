<script setup>
    import { RouterLink, useRoute } from 'vue-router';
    import { computed } from 'vue';
    import { useBebidasStore } from '../stores/bebidas';

    const route = useRoute();
    const bebidas = useBebidasStore();
    const paginaInicio = computed(() => route.name === 'inicio');

    const handleSubmit = async () => {
        //TODO: Validar
        console.log('Buscando...');
        await bebidas.obtenerRecetas();
    }
</script>

<template>
    <header
        :class="{header: paginaInicio}"
        class="bg-slate-800"
    >
        <div class="container mx-auto px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink 
                        :to="{name: 'inicio'}"
                        class="text-white uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        <img class="w-32" src="/logo.svg">
                    </RouterLink>
                </div>

                <nav class="flex gap-4">
                    <RouterLink
                        :to="{name: 'inicio'}"
                        class="text-white uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Inicio
                    </RouterLink>
                    <RouterLink
                        :to="{name: 'favs'}"
                        class="text-white uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <form
                v-if="paginaInicio"
                @submit.prevent="handleSubmit"
                class="md:w-1/2 bg-orange-400 my-32 p-8 rounded-lg shadow space-y-6"
            >
                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-semibold text-md"
                        for="ingrediente"
                    >Nombre o Ingredientes</label>
                    <input 
                        id="ingrediente"
                        type="text"
                        class="p-2 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o ingrediente: ej. Vodka, Tequila, etc"
                        v-model="bebidas.busqueda.nombre"
                    >
                </div>
                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-semibold text-md"
                        for="categoria"
                    >Categoria</label>
                    <select 
                        id="categoria"
                        class="p-2 w-full rounded-lg focus:outline-none"
                        v-model="bebidas.busqueda.categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option
                            v-for="categoria in bebidas.categorias"
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >{{ categoria.strCategory }}</option>
                    </select>
                </div>

                <input
                    class="rounded-lg bg-orange-700 hover:bg-orange-800 cursor-pointer text-white font-semibold w-full p-2 uppercase"
                    type="submit"
                    value="Buscar Recetas"
                >
            </form>

        </div>
    </header>
</template>

<style>
    .header{
        background-image: url('/bg.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
