<template>
  <jokes-component :isFavorites="true" :jokes="jokes" :loading="false" />
</template>

<script setup>
import JokesComponent from "@/components/JokesComponent.vue";

const jokes = JSON.parse(localStorage.getItem("savedJokes") || "[]");
</script>
