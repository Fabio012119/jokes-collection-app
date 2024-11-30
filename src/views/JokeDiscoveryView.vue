<template>
  <jokes-component
    :isFavorites="false"
    :jokes="jokes"
    :loading="loading"
    @fetchMoreJokes="fetchJokes"
    @toggleCategory="toggleCategory"
  />
</template>

<script setup>
import { ref } from "vue";
import JokesComponent from "@/components/JokesComponent.vue";

const jokes = ref([]);
const loading = ref(false);
const category = ref("Any");

const fetchJokes = async (newCategory) => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${newCategory || category.value}?amount=10`
    );
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    jokes.value = data.jokes.map((joke) => ({
      setup: joke.type === "twopart" ? joke.setup : joke.joke,
      punchline: joke.type === "twopart" ? joke.delivery : "",
    }));
  } catch (err) {
    console.error("Failed to fetch jokes:", err.message);
  } finally {
    loading.value = false;
  }
};

const toggleCategory = (newCategory) => {
  category.value = newCategory;
  fetchJokes(newCategory);
};

// Initial jokes
fetchJokes();
</script>
