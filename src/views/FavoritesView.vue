<template>
  <div class="mt-[2rem]">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search jokes..."
      class="mb-4 px-4 py-2 border rounded w-full max-w-lg"
    />

    <div class="flex space-x-4 mb-4 items-center justify-center">
      <select v-model="sortOption" class="px-4 py-2 border rounded">
        <option value="alphabetically">Sort Alphabetically</option>
        <option value="rating">Sort by Rating</option>
      </select>

      <select v-model="filterRating" class="px-4 py-2 border rounded">
        <option value="">All Ratings</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    </div>

    <div class="statistics text-center mb-4">
      <p>Total Jokes Saved: {{ totalJokes }}</p>
      <p>Average Rating: {{ averageRating }}</p>
    </div>
  </div>

  <jokes-component
    :isFavorites="true"
    :jokes="filteredJokes"
    :loading="false"
    :error="error"
    @updateJokeRating="handleJokeRatingUpdate"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import JokesComponent from "@/components/JokesComponent.vue";
import type { Joke } from "@/types";

const jokes = ref<Joke[]>(
  JSON.parse(localStorage.getItem("savedJokes") || "[]")
);

const error = computed((): string | null =>
  jokes.value.length === 0 ? "Add some favorite jokes" : null
);

const searchQuery = ref<string>("");
const sortOption = ref<"alphabetically" | "rating">("alphabetically");
const filterRating = ref<string>("");

const totalJokes = computed((): number => jokes.value.length);

const averageRating = computed((): string => {
  const totalRatings = jokes.value.reduce(
    (sum, joke) => sum + (joke.rating || 0),
    0
  );
  return jokes.value.length
    ? (totalRatings / jokes.value.length).toFixed(1)
    : "N/A";
});

const filteredJokes = computed((): Joke[] => {
  let result = jokes.value;

  if (searchQuery.value) {
    result = result.filter((joke) =>
      joke.setup.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterRating.value) {
    result = result.filter(
      (joke) => joke.rating === Number(filterRating.value)
    );
  }

  if (sortOption.value === "alphabetically") {
    result = [...result].sort((a, b) => a.setup.localeCompare(b.setup));
  } else if (sortOption.value === "rating") {
    result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return result;
});

const handleJokeRatingUpdate = (updatedJoke: Joke) => {
  const index = jokes.value.findIndex(
    (joke) => joke.setup === updatedJoke.setup
  );
  if (index !== -1) {
    jokes.value[index] = updatedJoke;
    localStorage.setItem("savedJokes", JSON.stringify(jokes.value));
  }
};
</script>
