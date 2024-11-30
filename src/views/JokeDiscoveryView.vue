<template>
  <JokeDiscovery />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JokeDiscovery from "@/components/JokeDiscovery.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    JokeDiscovery,
  },
});
</script>
