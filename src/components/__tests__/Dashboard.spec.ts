import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { render, screen, waitFor } from "@testing-library/vue";
import DashboardView from "../../views/DashboardView.vue";
import { faker } from "@faker-js/faker";

const mockFetchPokemonListFn = vi.fn().mockImplementation(async () => {
  return [
    {
      id: 1,
      name: "Pikachu",
      image: faker.image.urlPicsumPhotos(),
      type: "Elétrico",
    },
    {
      id: 2,
      name: "Charmander",
      image: faker.image.urlPicsumPhotos(),
      type: "Fogo",
    },
  ];
});

const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Testing -> DasboardView", () => {
  it("There must be a title on the screen", () => {
    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFetchPokemonListFn },
    });

    /* Wait for the component to mount and render */
    wrapper.vm.$nextTick();

    /* Check if the title exists */
    const title = wrapper.find("h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Pokemon Dashboard");
  });

  it("There must have at least 10 pokemon cards", async () => {
    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFetchPokemonListFn },
    });

    await waitFor(
      () => {
        const pokemonCards = wrapper.findAll(".pokemon-card");
        expect(pokemonCards.length).toBeGreaterThanOrEqual(2);
      },
      { timeout: 5000 }
    );
  });

  it("There must have a Pikachu on <h3></h3>", async () => {
    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFetchPokemonListFn },
    });

    await waitFor(
      () => {
        const pikachu = wrapper.findAll("h3").filter((node) => node.text() === "Pikachu");
        expect(pikachu.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });

  it("Should navigate to pokemon detail page when clicking on a pokemon card", async () => {
    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFetchPokemonListFn },
    });

    // Wait for pokemon cards to render
    await waitFor(
      () => {
        const pokemonCards = wrapper.findAll(".pokemon-card");
        expect(pokemonCards.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Click on the first pokemon card (Pikachu with id 1)
    const firstCard = wrapper.find(".pokemon-card");
    await firstCard.trigger("click");

    // Verify that router.push was called with the correct route
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/pokemonDetail/1");
  });

  it("Should navigate with correct pokemon id when clicking different cards", async () => {
    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFetchPokemonListFn },
    });

    await waitFor(
      () => {
        const pokemonCards = wrapper.findAll(".pokemon-card");
        expect(pokemonCards.length).toBe(2);
      },
      { timeout: 5000 }
    );

    // Click on the second pokemon card (Charmander with id 2)
    const secondCard = wrapper.findAll(".pokemon-card")[1];
    await secondCard.trigger("click");

    // Verify router.push was called with Charmander's id
    expect(mockPush).toHaveBeenCalledWith("/pokemonDetail/2");
  });

  it("Should log error and return early when fetchPokemonList prop is missing", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: undefined as any },
    });

    await wrapper.vm.$nextTick();

    // Verify that console.error was called with the correct message
    expect(consoleErrorSpy).toHaveBeenCalledWith("fetchPokemonList prop is missing");

    // Verify that no pokemon cards are rendered
    const pokemonCards = wrapper.findAll(".pokemon-card");
    expect(pokemonCards.length).toBe(0);

    consoleErrorSpy.mockRestore();
  });

  it("Should handle error when fetchPokemonList throws an error", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorMessage = "Failed to fetch Pokemon";
    const mockFailingFetch = vi.fn().mockRejectedValue(new Error(errorMessage));

    const wrapper = mount(DashboardView, {
      props: { fetchPokemonList: mockFailingFetch },
    });

    await waitFor(
      () => {
        // Verify that console.error was called with error message
        expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching Pokemon:", expect.any(Error));
      },
      { timeout: 5000 }
    );

    // Verify that no pokemon cards are rendered
    const pokemonCards = wrapper.findAll(".pokemon-card");
    expect(pokemonCards.length).toBe(0);

    consoleErrorSpy.mockRestore();
  });
});
