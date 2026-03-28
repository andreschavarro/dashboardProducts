<script setup lang="ts">
interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 8
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div 
      v-for="i in count" 
      :key="i"
      class="glass-card p-4 animate-pulse"
    >
      <div class="w-full aspect-square bg-gray-300 rounded-xl mb-4"></div>
      <div class="space-y-3">
        <div class="h-3 bg-gray-300 rounded w-1/3"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3"></div>
        <div class="h-3 bg-gray-300 rounded w-1/2"></div>
        <div class="h-6 bg-gray-300 rounded w-1/3 mt-2"></div>
        <div class="h-10 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </div>
  </div>
</template>
