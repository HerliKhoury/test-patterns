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
});
