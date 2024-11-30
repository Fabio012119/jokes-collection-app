<template>
    <jokes-component
      :isFavorites="false"
      :jokes="jokes"
      @fetchMoreJokes="fetchJokes"
      @toggleCategory="changeCategory"
    />
</template>

<script>
import JokesComponent from "@/components/JokesComponent.vue";
import { ref } from "vue";

const jokes = ref([]);
const category = ref("Any");

const fetchJokes = async (newCategory = category.value) => {
  category.value = newCategory;
  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category.value}?amount=10`
    );
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    jokes.value = data.jokes
      .map((joke) => ({
        setup: joke.type === "twopart" ? joke.setup : joke.joke,
        punchline: joke.type === "twopart" ? joke.delivery : "",
      }))
      .filter((joke) => joke.setup.length <= 100);
  } catch (err) {
    console.error("Failed to fetch jokes:", err.message);
  }
};

const changeCategory = (newCategory) => {
  fetchJokes(newCategory);
};

fetchJokes();

export default {
  name: "JokeDiscoveryView",
  components: {
    JokesComponent,
  },
  setup() {
    return {
      jokes,
      fetchJokes,
      changeCategory,
    };
  },
};
</script>
