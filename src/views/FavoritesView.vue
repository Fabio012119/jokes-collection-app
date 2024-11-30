<template>
  <jokes-component
    :isFavorites="true"
    :jokes="jokes"
    :loading="false"
    :error="error"
  />
</template>

<script setup>
import JokesComponent from "@/components/JokesComponent.vue";

const jokes = JSON.parse(localStorage.getItem("savedJokes") || "[]");

const error = jokes.length === 0 ? "Add some favorite jokes" : null;
</script>
