<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  icon?: 'search' | 'box' | 'error'
  showAction?: boolean
  actionText?: string
}

interface Emits {
  (e: 'action'): void
}

withDefaults(defineProps<Props>(), {
  title: 'No se encontraron productos',
  message: 'Intenta ajustar tus filtros de búsqueda',
  icon: 'search',
  showAction: true,
  actionText: 'Limpiar filtros'
})

const emit = defineEmits<Emits>()
</script>

<template>
  <div class="glass-card p-12 text-center">
    <div class="flex justify-center mb-6">
      <font-awesome-icon 
        v-if="icon === 'search'"
        icon="search"
        class="w-24 h-24 text-gray-300"
      />
      <font-awesome-icon 
        v-else-if="icon === 'box'"
        icon="box"
        class="w-24 h-24 text-gray-300"
      />
      <font-awesome-icon 
        v-else-if="icon === 'error'"
        icon="exclamation-circle"
        class="w-24 h-24 text-red-300"
      />
    </div>
    <h3 class="text-2xl font-bold text-gray-800 mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ message }}
    </p>
    <button
      v-if="showAction"
      @click="emit('action')"
      class="btn-primary"
    >
      {{ actionText }}
    </button>
  </div>
</template>
