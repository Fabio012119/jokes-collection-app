<template>
  <li
    class="mb-4 bg-gray-100 rounded shadow p-5 list-none flex-col items-center justify-center"
    data-testid="joke-item"
  >
    <div class="flex flex-col items-center">
      <p>{{ joke.setup }}</p>
      <button
        v-if="joke.punchline"
        @click="() => onReveal(index)"
        class="mt-2 px-3 py-1 bg-green-500 text-white rounded"
      >
        Reveal Punchline
      </button>
      <p v-else class="mt-2 font-medium text-gray-700">{{ joke.punchline }}</p>
      <div>
        <button
          @click="isSaved ? removeJoke() : saveJoke()"
          class="mt-2 px-3 py-1 rounded"
          :class="isSaved ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'"
        >
          {{ isSaved ? "Remove" : "Save" }}
        </button>
        <span
          v-if="isSaved && !isFavorites"
          class="text-white bg-yellow-400 mt-2 px-3 py-1 rounded"
        >
          ✓
        </span>
      </div>

      <div class="mt-4 flex items-center" v-if="isFavorites">
        <p class="mr-2 w-max text-sm">Rate this joke:</p>
        <div class="flex">
          <span
            v-for="star in 5"
            :key="star"
            @click="rateJoke(star)"
            class="cursor-pointer text-2xl"
            :class="star <= currentRating ? 'text-yellow-500' : 'text-gray-300'"
          >
            ★
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { JokeItemProps, Joke } from "@/types";

const props = defineProps<JokeItemProps>();

const isSaved = ref(false);
const currentRating = ref<number>(props.joke.rating || 0);

watch(
  () => props.joke.rating,
  (newRating) => {
    currentRating.value = newRating || 0;
  }
);

const savedJokes: Joke[] = JSON.parse(
  localStorage.getItem("savedJokes") || "[]"
);

const checkIfSaved = () => {
  isSaved.value = savedJokes.some(
    (savedJoke) => savedJoke.setup === props.joke.setup
  );
};

const saveJoke = () => {
  props.onSave(props.joke);
  isSaved.value = true;
};

const removeJoke = () => {
  const updatedJokes = savedJokes.filter(
    (savedJoke) => savedJoke.setup !== props.joke.setup
  );
  localStorage.setItem("savedJokes", JSON.stringify(updatedJokes));
  isSaved.value = false;
};

const rateJoke = (rating: number) => {
  currentRating.value = rating;
  props.onRate(props.index, rating);
};

checkIfSaved();
</script>
