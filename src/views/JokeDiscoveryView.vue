<template>
  <jokes-component
    :isFavorites="false"
    :jokes="jokes"
    :loading="loading"
    :error="error"
    @fetchMoreJokes="fetchJokes"
    @toggleCategory="toggleCategory"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import JokesComponent from "@/components/JokesComponent.vue";
import type { JokeApiResponse, Joke } from "@/types";

const jokes = ref<Joke[]>([]);
const loading = ref<boolean>(false);
const error = ref<string>("");
const category = ref<string>("Any");

const fetchJokes = async (newCategory?: string): Promise<void> => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${newCategory || category.value}?amount=10`
    );
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    jokes.value = data.jokes
      .map((joke: JokeApiResponse) => ({
        setup: joke.type === "twopart" ? joke.setup || "" : joke.joke || "",
        punchline: joke.type === "twopart" ? joke.delivery || "" : "",
      }))
      .filter((joke: Joke) => joke.setup.length <= 250);
  } catch (err: unknown) {
    console.error("Failed to fetch jokes:", (err as Error).message);
    error.value = "Oops there was an error, please try again later.";
  } finally {
    loading.value = false;
  }
};

const toggleCategory = (newCategory: string): void => {
  category.value = newCategory;
  fetchJokes(newCategory);
};

fetchJokes();
</script>
