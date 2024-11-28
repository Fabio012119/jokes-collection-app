<template>
  <div class="home">
    <MainComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainComponent from "@/components/Main.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainComponent,
  },
});
</script>
