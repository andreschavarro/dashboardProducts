<script setup lang="ts">
import type { ProductCategory } from '@/types/product'

interface Props {
  categories: ProductCategory[]
  modelValue: string
  loading?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCategoryChange = (category: string) => {
  emit('update:modelValue', category)
}

const formatCategoryName = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="space-y-3">
    <label class="block text-sm font-semibold text-gray-700">
      Categoría
    </label>

    <div v-if="loading" class="flex gap-2 overflow-x-auto pb-2">
      <div 
        v-for="i in 5" 
        :key="i"
        class="h-10 w-32 bg-gray-200 animate-pulse rounded-lg"
      />
    </div>
    <div v-else class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <button
        @click="handleCategoryChange('')"
        :class="[
          'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300',
          modelValue === '' 
            ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg' 
            : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
        ]"
      >
        Todas 
      </button>

      <button
        v-for="category in categories"
        :key="category.slug"
        @click="handleCategoryChange(category.slug)"
        :class="[
          'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300',
          modelValue === category.slug 
            ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg' 
            : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
        ]"
      >
        {{ formatCategoryName(category.slug) }}
      </button>
    </div>

    <div v-if="modelValue" class="flex items-center gap-2 text-sm text-gray-700">
      <font-awesome-icon 
        icon="filter" 
        class="w-4 h-4"
      />
      <span>Filtrando por: <strong>{{ formatCategoryName(modelValue) }}</strong></span>
      <button
        @click="handleCategoryChange('')"
        class="ml-2 text-red-500 hover:text-red-700 font-semibold"
      >
        Limpiar
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
