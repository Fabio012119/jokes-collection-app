<template>
  <li
    class="mb-4 bg-gray-100 rounded shadow p-5 list-none flex items-center justify-center"
  >
    <p>{{ joke.setup }}</p>
    <button
      v-if="!joke.revealed"
      @click="() => onReveal(index)"
      class="mt-2 px-3 py-1 bg-green-500 text-white rounded"
    >
      Reveal Punchline
    </button>
    <p v-else class="mt-2 font-medium text-gray-700">{{ joke.punchline }}</p>
  </li>
</template>

<script setup>
defineProps({
  joke: {
    type: Object,
    required: true,
  },
  onReveal: {
    type: Function,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
