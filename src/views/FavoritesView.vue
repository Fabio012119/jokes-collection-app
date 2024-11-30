<template>
  <jokes-component :isFavorites="true" />
</template>

<script lang="ts">
import JokesComponent from "@/components/JokesComponent.vue";

export default {
  name: "FavoritesView",
  components: {
    JokesComponent,
  },
};
</script>
