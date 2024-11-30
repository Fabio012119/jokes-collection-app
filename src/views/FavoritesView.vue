<template>
  <div class="controls p-4 flex flex-col items-center">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search jokes..."
      class="mb-4 px-4 py-2 border rounded w-full max-w-lg"
    />
  </div>

  <div class="text-center mb-4">
    <p>Total Jokes Saved: {{ totalJokes }}</p>
  </div>

  <jokes-component
    :isFavorites="true"
    :jokes="filteredJokes"
    :loading="false"
    :error="error"
    @updateJokeRating="handleJokeRatingUpdate"
  />
</template>

<script setup>
import JokesComponent from "@/components/JokesComponent.vue";
import { ref } from "vue";

const jokes = JSON.parse(localStorage.getItem("savedJokes") || "[]");
const searchQuery = ref("");

const filteredJokes = () => {
  let result = jokes;

  if (searchQuery.value) {
    result = result.filter((joke) =>
      joke.setup.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
};
</script>
