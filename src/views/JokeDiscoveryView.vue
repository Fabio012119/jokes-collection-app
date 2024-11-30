<template>
  <jokes-component :isFavorites="false" />
</template>

<script lang="ts">
import JokesComponent from "@/components/JokesComponent.vue";

export default {
  name: "JokeDiscoveryView",
  components: {
    JokesComponent,
  },
};
</script>
