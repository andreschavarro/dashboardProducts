<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <nav class="glass-card sticky top-0 z-50 mb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button 
          @click="goHome"
          class="flex items-center gap-3 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <font-awesome-icon icon="store" class="text-white text-xl" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-xs text-gray-600">Tu tienda en línea</p>
          </div>
        </button>

        <div class="flex items-center gap-4">
          <button 
            @click="goHome"
            class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Inicio
          </button>
          <button class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Categorías
          </button>
          <button class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
            <font-awesome-icon 
              icon="shopping-cart" 
              class="w-6 h-6"
            />
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
