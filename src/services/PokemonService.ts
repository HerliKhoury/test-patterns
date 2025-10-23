import { PokemonType } from "../types/PokemonTypes";

const BASE_URL = "http://localhost:3003"

export async function fetchPokemonList(): Promise<PokemonType[]> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: PokemonType[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch Pokémon list:", error);
        throw error; 
    }
}


export async function fetchPokemonById(id: number): Promise<PokemonType> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: PokemonType = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch Pokémon list:", error);
        throw error; 
    }
}