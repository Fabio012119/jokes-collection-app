<template>
  <joke-discovery />
</template>
<script>
import JokeDiscovery from "./JokeDiscovery.vue";
export default {
  name: "MainComponent",
  components: {
    JokeDiscovery,
  },
};
</script>

<style>
h2 {
  color: blue;
}
</style>
