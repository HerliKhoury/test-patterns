<template>
    <div class="maDiv">
        <h1>Pokemon Dashboard</h1>
        <div class="pokemon-grid">
            <div v-for="pokemon in pokemonList" :key="pokemon.id" class="pokemon-card">
                <img :src="pokemon.image" :alt="pokemon.name" />
                <h3>{{ pokemon.name }}</h3>
                <p>Type: {{ pokemon.type }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PokemonType } from '../types/PokemonTypes';


const props = defineProps<{
    fetchPokemonList: () => Promise<PokemonType[]>;
}>();

const pokemonList = ref<PokemonType[]>([])

onMounted(async () => {
    /* Check if prop is allright */
    if (!props.fetchPokemonList) {
        console.error("fetchPokemonList prop is missing");
        return;
    }

    try {
        const data = await props.fetchPokemonList();
        pokemonList.value = data
        console.log(`${pokemonList.value.length} Pokemons na lista`)
    } catch (error) {
        console.error('Error fetching Pokemon:', error)
    }
})
</script>

<style>
.maDiv {
    background-color: rgb(122, 41, 138);
    color: #ffffff;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.pokemon-card {
    background-color: rgb(121, 223, 96);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
}

.pokemon-card:hover {
    transform: translateY(-5px);
}

.pokemon-card img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
}

.pokemon-card h3 {
    margin: 10px 0;
    color: #333;
    text-transform: capitalize;
}

.pokemon-card p {
    margin: 5px 0;
    color: #666;
}

h1 {
    text-align: center;
    margin: 0;
}
</style>