<template>
  <div class="p-4 flex flex-col items-center" data-testid="jokes-component">
    <h1 class="text-2xl font-bold mb-4">
      {{ isFavorites ? "Favorites" : "Joke Discovery" }}
    </h1>

    <router-link
      :to="isFavorites ? '/' : '/favorites'"
      class="px-4 py-2 bg-purple-500 text-white rounded mb-4"
    >
      {{ isFavorites ? "Go to Joke Discovery" : "Go to Favorites" }}
    </router-link>

    <div v-if="!isFavorites">
      <button
        @click="toggleCategory"
        class="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        {{
          category === "Any"
            ? "Switch to Programming Jokes"
            : "Switch to Random Jokes"
        }}
      </button>
    </div>

    <div
      v-if="loading"
      class="mt-4 w-[48px] h-[48px] border-solid border-[5px] border-gray [border-bottom-color:#ff3d00] rounded-full inline-block box-border animate-spin"
    ></div>

    <div v-else-if="error" class="mt-4 text-red-500 font-medium">
      ⚠️ {{ error }}
    </div>

    <div v-else class="mt-[3rem] flex flex-col items-center">
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-5 w-full max-w-6xl"
      >
        <joke-item
          v-for="(joke, index) in jokes"
          :key="index"
          :joke="joke"
          :index="index"
          :onReveal="revealPunchline"
          :onSave="saveJoke"
          :onRate="updateJokeRating"
          :isFavorites="isFavorites"
        />
      </ul>

      <button
        v-if="!isFavorites"
        @click="fetchMoreJokes"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Fetch More Jokes
      </button>
    </div>

    <punch-line-reveal
      v-if="modalVisible"
      :visible="modalVisible"
      @close="closeModal"
    >
      <h2 class="text-xl font-bold mb-4">Punchline</h2>
      <p class="text-lg">{{ modalPunchline }}</p>
    </punch-line-reveal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JokeItem from "./JokeItem/JokeItem.vue";
import PunchLineReveal from "./JokeItem/PunchLineReveal.vue";
import type { Joke, JokesComponentProps, JokesComponentEmits } from "@/types";

const props = defineProps<JokesComponentProps>();

const emit = defineEmits<JokesComponentEmits>();

const modalVisible = ref(false);
const modalPunchline = ref<string>("");
const category = ref<string>("Any");

const fetchMoreJokes = () => {
  emit("fetchMoreJokes", category.value);
};

const toggleCategory = () => {
  category.value = category.value === "Any" ? "Programming" : "Any";
  emit("toggleCategory", category.value);
};

const revealPunchline = (index: number) => {
  modalPunchline.value = props.jokes[index]?.punchline || "";
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const saveJoke = (joke: Joke) => {
  const savedJokes: Joke[] = JSON.parse(
    localStorage.getItem("savedJokes") || "[]"
  );

  if (!savedJokes.some((saved) => saved.setup === joke.setup)) {
    savedJokes.push(joke);
    localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
  }
};

const jokesCopy = ref<Joke[]>([...props.jokes]);

const updateJokeRating = (index: number, rating: number) => {
  jokesCopy.value[index].rating = rating;
  emit("updateJokeRating", jokesCopy.value[index]);
};
</script>
