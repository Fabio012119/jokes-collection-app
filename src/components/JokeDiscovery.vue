<template>
  <div class="p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">Joke Discovery</h1>

    <div>
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
        ></joke-item>
      </ul>
      <button
        @click="fetchJokes"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded w-max"
      >
        Fetch More Jokes
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import JokeItem from "./JokeItem";

export default {
  name: "JokeDiscovery",
  components: {
    JokeItem,
  },
  setup() {
    const jokes = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const category = ref("Any");
    const savedJokesKey = "savedJokes";

    const fetchJokes = async () => {
      loading.value = true;
      error.value = null;

      try {
        const response = await fetch(
          `https://v2.jokeapi.dev/joke/${category.value}?amount=10`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        jokes.value = data.jokes
          .map((joke) => ({
            setup: joke.type === "twopart" ? joke.setup : joke.joke,
            punchline: joke.type === "twopart" ? joke.delivery : "",
            revealed: false,
          }))
          .filter((joke) => joke.setup.length <= 85);
      } catch (err) {
        error.value = "Oops! Unable to fetch jokes. Please try again later.";
      } finally {
        loading.value = false;
      }
    };

    const revealPunchline = (index) => {
      jokes.value[index].revealed = true;
    };

    const toggleCategory = () => {
      category.value = category.value === "Any" ? "Programming" : "Any";
      fetchJokes();
    };

    const saveJoke = (joke) => {
      const savedJokes = JSON.parse(localStorage.getItem(savedJokesKey)) || [];
      if (!savedJokes.some((savedJoke) => savedJoke.setup === joke.setup)) {
        savedJokes.push({ ...joke, rating: 0 });
        localStorage.setItem(savedJokesKey, JSON.stringify(savedJokes));
      }
    };

    fetchJokes();

    console.log(localStorage);
    //localStorage.clear();

    return {
      jokes,
      saveJoke,
      loading,
      error,
      category,
      fetchJokes,
      revealPunchline,
      toggleCategory,
    };
  },
};
</script>
