<template>
  <div class="p-4 flex flex-col items-center">
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
        ></joke-item>
      </ul>
      <button
        v-if="!isFavorites"
        @click="fetchJokes"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded w-max"
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

<script>
import { ref } from "vue";
import JokeItem from "./JokeItem/JokeItem.vue";
import PunchLineReveal from "./JokeItem/PunchLineReveal.vue";

export default {
  name: "JokesComponent",
  components: {
    JokeItem,
    PunchLineReveal,
  },
  props: {
    isFavorites: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const jokes = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const category = ref("Any");
    const savedJokesKey = "savedJokes";
    const modalVisible = ref(false);
    const modalPunchline = ref("");

    const fetchJokes = async () => {
      if (props.isFavorites) {
        getFavoriteJokes();
        return;
      }

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
          .filter((joke) => joke.setup.length <= 150);
      } catch (err) {
        error.value = "Oops! Unable to fetch jokes. Please try again later.";
      } finally {
        loading.value = false;
      }
    };

    const getFavoriteJokes = () => {
      const savedJokes = JSON.parse(
        localStorage.getItem(savedJokesKey) || "[]"
      );
      jokes.value = savedJokes;
    };

    const revealPunchline = (index) => {
      modalPunchline.value = jokes.value[index].punchline;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const toggleCategory = () => {
      if (!props.isFavorites) {
        category.value = category.value === "Any" ? "Programming" : "Any";
        fetchJokes();
      }
    };

    const saveJoke = (joke) => {
      const savedJokes = JSON.parse(
        localStorage.getItem(savedJokesKey) || "[]"
      );
      if (!savedJokes.some((savedJoke) => savedJoke.setup === joke.setup)) {
        savedJokes.push({ ...joke, rating: 0 });
        localStorage.setItem(savedJokesKey, JSON.stringify(savedJokes));
      }
    };

    if (props.isFavorites) {
      getFavoriteJokes();
    } else {
      fetchJokes();
    }

    return {
      jokes,
      saveJoke,
      loading,
      error,
      category,
      fetchJokes,
      revealPunchline,
      toggleCategory,
      modalVisible,
      modalPunchline,
      closeModal,
    };
  },
};
</script>
