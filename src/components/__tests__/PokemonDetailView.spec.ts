import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { waitFor } from "@testing-library/vue";
import PokemonDetailView from "../../views/PokemonDetailView.vue";
import { faker } from "@faker-js/faker";

// Mock the PokemonService
const mockFetchPokemonById = vi.fn()
vi.mock('../../services/PokemonService', () => ({
  fetchPokemonById: (pokemonId: string) => mockFetchPokemonById(pokemonId)
}))

// Mock vue-router
const mockRouterBack = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    back: mockRouterBack,
  }),
}));

describe("Testing -> PokemonDetailView", () => {
  const mockPokemon = {
    id: 1,
    name: "Pikachu",
    image: faker.image.urlPicsumPhotos(),
    type: "Electric",
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it("should display loading state initially", () => {
    mockFetchPokemonById.mockImplementation(() => new Promise(() => {})); // Never resolves

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    // Check if loader is displayed
    expect(wrapper.find(".loader-container").exists()).toBe(true);
    expect(wrapper.find(".pokeball-loader").exists()).toBe(true);
    expect(wrapper.find(".loading-text").text()).toBe("Loading Pokemon...");

    // Pokemon content should not be visible
    expect(wrapper.find(".pokemon-content").exists()).toBe(false);
  });

  it("should display pokemon details after successful fetch", async () => {
    mockFetchPokemonById.mockResolvedValue(mockPokemon);

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    // Wait for the component to finish loading
    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Verify fetchPokemonById was called with correct ID
    expect(mockFetchPokemonById).toHaveBeenCalledWith("1");
    expect(mockFetchPokemonById).toHaveBeenCalledTimes(1);

    // Check if pokemon details are displayed
    expect(wrapper.find(".pokemon-name").text()).toBe("Pikachu");
    expect(wrapper.find(".pokemon-type").text()).toBe("Electric");
    expect(wrapper.find(".pokemon-image").attributes("src")).toBe(mockPokemon.image);
    expect(wrapper.find(".pokemon-image").attributes("alt")).toBe("Pokemon Picture");

    // Check if loader is no longer displayed
    expect(wrapper.find(".loader-container").exists()).toBe(false);
  });

  it("should display pokemon ID in the info section", async () => {
    mockFetchPokemonById.mockResolvedValue(mockPokemon);

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Find all info items and check the ID
    const infoItems = wrapper.findAll(".info-item");
    expect(infoItems.length).toBe(2);

    // Check if ID is displayed correctly
    const idInfo = infoItems[1]; // Second info item should be ID
    expect(idInfo.find(".info-label").text()).toBe("ID");
    expect(idInfo.find(".info-value").text()).toBe("#1");
  });

  it("should display type in both header and info section", async () => {
    mockFetchPokemonById.mockResolvedValue(mockPokemon);

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Check type in header
    expect(wrapper.find(".pokemon-header .pokemon-type").text()).toBe("Electric");

    // Check type in info section
    const infoItems = wrapper.findAll(".info-item");
    const typeInfo = infoItems[0]; // First info item should be Type
    expect(typeInfo.find(".info-label").text()).toBe("Type");
    expect(typeInfo.find(".info-value").text()).toBe("Electric");
  });

  it("should call router.back() when clicking the back button", async () => {
    mockFetchPokemonById.mockResolvedValue(mockPokemon);

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Find and click the back button
    const backButton = wrapper.find(".back-button");
    expect(backButton.exists()).toBe(true);
    expect(backButton.text()).toContain("Go Back");

    await backButton.trigger("click");

    // Verify router.back() was called
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });

  it("should handle error when fetching pokemon fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorMessage = "Failed to fetch Pokemon";
    mockFetchPokemonById.mockRejectedValue(new Error(errorMessage));

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "999",
      },
    });

    // Initially, loader should be visible
    expect(wrapper.find(".loader-container").exists()).toBe(true);

    await waitFor(
      () => {
        // Verify console.error was called
        expect(consoleErrorSpy).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );

    // After error, verify console.error was called with correct message
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to fetch Pokémon:", expect.any(Error));

    await wrapper.vm.$nextTick();

    // Pokemon content should not be displayed when fetch fails
    expect(wrapper.find(".pokemon-content").exists()).toBe(false);

    // Loader container will still be displayed because of the v-else
    // (since Pokemon is null, the v-if condition is false)
    expect(wrapper.find(".loader-container").exists()).toBe(true);

    consoleErrorSpy.mockRestore();
  });

  it("should fetch pokemon with correct ID from props", async () => {
    mockFetchPokemonById.mockResolvedValue({
      ...mockPokemon,
      id: 25,
      name: "Raichu",
    });

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "25",
      },
    });

    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Verify fetchPokemonById was called with the correct ID
    expect(mockFetchPokemonById).toHaveBeenCalledWith("25");
  });

  it("should display all required UI elements when loaded", async () => {
    mockFetchPokemonById.mockResolvedValue(mockPokemon);

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    await waitFor(
      () => {
        expect(wrapper.find(".pokemon-content").exists()).toBe(true);
      },
      { timeout: 5000 }
    );

    // Check all major UI elements exist
    expect(wrapper.find(".back-button").exists()).toBe(true);
    expect(wrapper.find(".arrow").exists()).toBe(true);
    expect(wrapper.find(".pokemon-card-detail").exists()).toBe(true);
    expect(wrapper.find(".pokemon-header").exists()).toBe(true);
    expect(wrapper.find(".pokemon-image-container").exists()).toBe(true);
    expect(wrapper.find(".image-background").exists()).toBe(true);
    expect(wrapper.find(".pokemon-info").exists()).toBe(true);
    expect(wrapper.findAll(".info-item").length).toBe(2);
  });

  it("should display loading elements with correct structure", () => {
    mockFetchPokemonById.mockImplementation(() => new Promise(() => {}));

    const wrapper = mount(PokemonDetailView, {
      props: {
        pokemonId: "1",
      },
    });

    // Check all pokeball loader elements exist
    expect(wrapper.find(".pokeball-loader").exists()).toBe(true);
    expect(wrapper.find(".pokeball-top").exists()).toBe(true);
    expect(wrapper.find(".pokeball-middle").exists()).toBe(true);
    expect(wrapper.find(".pokeball-bottom").exists()).toBe(true);
    expect(wrapper.find(".pokeball-button").exists()).toBe(true);
  });
});
