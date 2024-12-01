<template>
  <li
    class="mb-4 bg-gray-100 rounded shadow p-5 list-none flex-col items-center justify-center"
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
        <p class="mr-2">Rate this joke:</p>
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

<script setup>
import { ref } from "vue";

const props = defineProps({
  joke: {
    type: Object,
    required: true,
  },
  onReveal: {
    type: Function,
    required: true,
  },
  onSave: {
    type: Function,
    required: true,
  },
  onRate: {
    type: Function,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isFavorites: {
    type: Boolean,
    required: true,
  },
});

const isSaved = ref(false);
const currentRating = ref(props.joke.rating || 0);

const savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];

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

const rateJoke = (rating) => {
  currentRating.value = rating;
  props.onRate(props.index, rating);
};

checkIfSaved();
</script>
