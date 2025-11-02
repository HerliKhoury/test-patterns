import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchPokemonList, fetchPokemonById } from '../../services/PokemonService'
import { PokemonType } from '../../types/PokemonTypes'

// Mock fetch globally
global.fetch = vi.fn()

describe('Testing -> PokemonService', () => {
  const BASE_URL = 'http://localhost:3003'
  
  const mockPokemonList: PokemonType[] = [
    {
      id: 1,
      name: 'Pikachu',
      image: 'https://example.com/pikachu.png',
      type: 'Electric'
    },
    {
      id: 2,
      name: 'Charmander',
      image: 'https://example.com/charmander.png',
      type: 'Fire'
    },
    {
      id: 3,
      name: 'Bulbasaur',
      image: 'https://example.com/bulbasaur.png',
      type: 'Grass'
    }
  ]

  const mockSinglePokemon: PokemonType = {
    id: 1,
    name: 'Pikachu',
    image: 'https://example.com/pikachu.png',
    type: 'Electric'
  }

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchPokemonList', () => {
    it('should fetch pokemon list successfully and return correct data', async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockPokemonList)
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await fetchPokemonList()

      // Verify the result is correct
      expect(result).toEqual(mockPokemonList)
      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('Pikachu')
      expect(result[1].name).toBe('Charmander')
      expect(result[2].name).toBe('Bulbasaur')
    })

    it('should call the correct URL for fetching pokemon list', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockPokemonList)
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await fetchPokemonList()

      // Verify fetch was called with correct URL
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon`)
    })

    it('should throw error when response is not ok (status 404)', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const mockResponse = {
        ok: false,
        status: 404,
        json: vi.fn()
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      // Verify that the function throws an error
      await expect(fetchPokemonList()).rejects.toThrow('HTTP error! Status: 404')

      // Verify console.error was called
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should throw error when response is not ok (status 500)', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const mockResponse = {
        ok: false,
        status: 500,
        json: vi.fn()
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(fetchPokemonList()).rejects.toThrow('HTTP error! Status: 500')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should handle network errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const networkError = new Error('Network error')
      
      ;(global.fetch as any).mockRejectedValue(networkError)

      await expect(fetchPokemonList()).rejects.toThrow('Network error')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        networkError
      )

      consoleErrorSpy.mockRestore()
    })

    it('should return an empty array when API returns empty data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([])
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await fetchPokemonList()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })
  })

  describe('fetchPokemonById', () => {
    it('should fetch a single pokemon by id successfully and return correct data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockSinglePokemon)
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await fetchPokemonById(1)

      // Verify the result is correct
      expect(result).toEqual(mockSinglePokemon)
      expect(result.id).toBe(1)
      expect(result.name).toBe('Pikachu')
      expect(result.type).toBe('Electric')
      expect(result.image).toBe('https://example.com/pikachu.png')
    })

    it('should call the correct URL with pokemon id', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockSinglePokemon)
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await fetchPokemonById(1)

      // Verify fetch was called with correct URL including the ID
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon/1`)
    })

    it('should call correct URL for different pokemon ids', async () => {
      const mockCharmander = {
        id: 4,
        name: 'Charmander',
        image: 'https://example.com/charmander.png',
        type: 'Fire'
      }

      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockCharmander)
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await fetchPokemonById(4)

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon/4`)
    })

    it('should throw error when pokemon is not found (status 404)', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const mockResponse = {
        ok: false,
        status: 404,
        json: vi.fn()
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(fetchPokemonById(999)).rejects.toThrow('HTTP error! Status: 404')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should throw error when response is not ok (status 500)', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const mockResponse = {
        ok: false,
        status: 500,
        json: vi.fn()
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(fetchPokemonById(1)).rejects.toThrow('HTTP error! Status: 500')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })

    it('should handle network errors when fetching by id', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const networkError = new Error('Network error')
      
      ;(global.fetch as any).mockRejectedValue(networkError)

      await expect(fetchPokemonById(1)).rejects.toThrow('Network error')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch Pokémon list:',
        networkError
      )

      consoleErrorSpy.mockRestore()
    })

    it('should handle JSON parsing errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      }
      
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(fetchPokemonById(1)).rejects.toThrow('Invalid JSON')

      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })
  })
})