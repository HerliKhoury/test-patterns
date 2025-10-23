import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import SignupView from "../views/SignupView.vue";
import { fetchPokemonList } from "../services/PokemonService";
import PokemonDetailView from "../views/PokemonDetailView.vue";

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      props: () => ({
        fetchPokemonList
      })
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignupView,
    },
    {
      path: "/pokemonDetail/:pokemonId",
      name: "pokemonDetail",
      component: PokemonDetailView,
      props: true // Automatically passes route params as props to the component
    },
  ],
});

export default router;
