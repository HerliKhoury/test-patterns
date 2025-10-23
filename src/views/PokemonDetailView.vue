<template>
    <div class="pokemon-detail-container">
        <div v-if="!isLoading && Pokemon" class="pokemon-content">
            <button @click="goBack" class="back-button">
                <span class="arrow">←</span> Go Back
            </button>
            
            <div class="pokemon-card-detail">
                <div class="pokemon-header">
                    <h2 class="pokemon-name">{{ Pokemon.name }}</h2>
                    <span class="pokemon-type">{{ Pokemon.type }}</span>
                </div>
                
                <div class="pokemon-image-container">
                    <div class="image-background"></div>
                    <img :src="Pokemon.image" alt="Pokemon Picture" class="pokemon-image">
                </div>
                
                <div class="pokemon-info">
                    <div class="info-item">
                        <span class="info-label">Type</span>
                        <span class="info-value">{{ Pokemon.type }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">ID</span>
                        <span class="info-value">#{{ pokemonId }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else class="loader-container">
            <div class="pokeball-loader">
                <div class="pokeball-top"></div>
                <div class="pokeball-middle"></div>
                <div class="pokeball-bottom"></div>
                <div class="pokeball-button"></div>
            </div>
            <p class="loading-text">Loading Pokemon...</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchPokemonById } from '../services/PokemonService';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    pokemonId: String
})

const Pokemon = ref(null);
const isLoading = ref(true);

const goBack = () => {
    router.back();
}

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

<style scoped>
.pokemon-detail-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
}

.pokemon-content {
    width: 100%;
    max-width: 600px;
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.back-button {
    padding: 12px 24px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 30px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.back-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateX(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
}

.back-button:hover .arrow {
    transform: translateX(-3px);
}

.pokemon-card-detail {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 30px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.pokemon-header {
    text-align: center;
    margin-bottom: 30px;
}

.pokemon-name {
    font-size: 2.5em;
    color: #333;
    text-transform: capitalize;
    margin: 0 0 15px 0;
    font-weight: 800;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.pokemon-type {
    display: inline-block;
    padding: 8px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.pokemon-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
}

.image-background {
    position: absolute;
    width: 280px;
    height: 280px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.3;
    }
}

.pokemon-image {
    width: 250px;
    height: 250px;
    object-fit: contain;
    filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));
    z-index: 1;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
}

.pokemon-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 30px;
}

.info-item {
    background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
}

.info-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.info-label {
    display: block;
    font-size: 0.85em;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    font-weight: 600;
}

.info-value {
    display: block;
    font-size: 1.3em;
    color: #333;
    font-weight: 700;
    text-transform: capitalize;
}

/* Loader Styles */
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.pokeball-loader {
    width: 100px;
    height: 100px;
    position: relative;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.pokeball-top {
    width: 100px;
    height: 50px;
    background: linear-gradient(180deg, #ff6b6b 0%, #ee5a52 100%);
    border-radius: 100px 100px 0 0;
    position: relative;
    box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.2);
}

.pokeball-bottom {
    width: 100px;
    height: 50px;
    background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
    border-radius: 0 0 100px 100px;
    position: relative;
    box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1);
}

.pokeball-middle {
    width: 100px;
    height: 8px;
    background: #333;
    position: absolute;
    top: 46px;
    z-index: 2;
}

.pokeball-button {
    width: 30px;
    height: 30px;
    background: white;
    border: 5px solid #333;
    border-radius: 50%;
    position: absolute;
    top: 35px;
    left: 35px;
    z-index: 3;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.loading-text {
    color: white;
    font-size: 1.3em;
    font-weight: 600;
    letter-spacing: 1px;
    animation: fadeInOut 1.5s ease-in-out infinite;
}

@keyframes fadeInOut {
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .pokemon-card-detail {
        padding: 30px 20px;
    }
    
    .pokemon-name {
        font-size: 2em;
    }
    
    .pokemon-image {
        width: 200px;
        height: 200px;
    }
    
    .image-background {
        width: 230px;
        height: 230px;
    }
    
    .pokemon-info {
        grid-template-columns: 1fr;
    }
}
</style>