<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  totalItems: number
  itemsPerPage: number
}

interface Emits {
  (e: 'next'): void
  (e: 'previous'): void
  (e: 'goToPage', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 7

  if (props.totalPages <= maxVisible) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.totalPages)
    } else if (props.currentPage >= props.totalPages - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = props.totalPages - 4; i <= props.totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.totalPages)
    }
  }

  return pages
})

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))
</script>

<template>
  <div class="glass-card p-6 space-y-4">
    <div class="text-center text-sm text-gray-600">
      Mostrando <span class="font-semibold text-gray-900">{{ startItem }}</span> a 
      <span class="font-semibold text-gray-900">{{ endItem }}</span> de 
      <span class="font-semibold text-gray-900">{{ totalItems }}</span> productos
    </div>
    <div class="flex items-center justify-center gap-2 flex-wrap">
      <button
        @click="emit('previous')"
        :disabled="!hasPrevious"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-300',
          hasPrevious
            ? 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        <font-awesome-icon 
          icon="chevron-left" 
          class="w-5 h-5"
        />
      </button>
      <template v-for="(page, index) in displayPages" :key="index">
        <span 
          v-if="page === '...'"
          class="px-3 py-2 text-gray-500"
        >
          ...
        </span>

        <button
          v-else
          @click="emit('goToPage', page as number)"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-300 min-w-[40px]',
            currentPage === page
              ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg'
              : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
          ]"
        >
          {{ page }}
        </button>
      </template>
      <button
        @click="emit('next')"
        :disabled="!hasNext"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-300',
          hasNext
            ? 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        <font-awesome-icon 
          icon="chevron-right" 
          class="w-5 h-5"
        />
      </button>
    </div>
  </div>
</template>
