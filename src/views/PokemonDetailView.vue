<template>
    <div v-if="!isLoading && Pokemon">
        <h1>{{ `Pokemon ${Pokemon.name}` }}</h1>
    </div>
    <div v-else>
        My loader here
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchPokemonById } from '../services/PokemonService';


const props = defineProps({
    pokemonId: String
})

const Pokemon = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        Pokemon.value = await fetchPokemonById(props.pokemonId);
    } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
    } finally {
        isLoading.value = false;
    }
})

</script>

<style></style>