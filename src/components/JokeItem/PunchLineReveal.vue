<template>
  <transition class="animate-modal-slide-in" data-testid="jokes-punchline">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg text-center transform w-[50%]"
      >
        <slot></slot>
        <button
          @click="closeModal"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const closeModal = () => {
  emit("close");
};
</script>
