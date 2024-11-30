<template>
  <jokes-component :isFavorites="true" :jokes="jokes" />
</template>

<script>
import JokesComponent from "@/components/JokesComponent.vue";
export default {
  name: "FavoritesView",
  components: {
    JokesComponent,
  },
  setup() {
    const jokes = JSON.parse(localStorage.getItem("savedJokes") || "[]");

    return {
      jokes,
    };
  },
};
</script>
