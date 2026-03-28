<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  debounceDelay?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar productos...',
  debounceDelay: 500,
})

const emit = defineEmits<Emits>()

const localValue = ref(props.modelValue)
let timeoutId: ReturnType<typeof setTimeout> | null = null

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
  
  // Clear previous timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  // Set new timeout for debounced search
  timeoutId = setTimeout(() => {
    emit('search', newValue)
  }, props.debounceDelay)
})

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

const clearSearch = () => {
  localValue.value = ''
}
</script>

<template>
  <div class="relative w-full">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <font-awesome-icon 
          icon="search" 
          class="w-5 h-5 text-gray-400"
        />
      </div>

      <input
        v-model="localValue"
        type="text"
        :placeholder="placeholder"
        class="input-modern pl-12 pr-10"
      />

      <button
        v-if="localValue"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        <font-awesome-icon 
          icon="xmark" 
          class="w-5 h-5"
        />
      </button>
    </div>
  </div>
</template>
