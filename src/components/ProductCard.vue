<script setup lang="ts">
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import { useFormatters } from '@/composables/useFormatters'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()
const { formatPrice } = useFormatters()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div 
    class="glass-card p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group overflow-hidden"
    @click="goToDetail"
  >
    <div class="relative overflow-hidden rounded-xl mb-4 bg-gray-100 aspect-square">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      
      <div 
        v-if="product.discountPercentage > 0"
        class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
      >
        -{{ Math.round(product.discountPercentage) }}%
      </div>

      <div 
        v-if="product.stock < 10"
        class="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
      >
        ¡Solo {{ product.stock }} quedan!
      </div>
    </div>

    <div class="space-y-2">
      <span class="text-xs font-semibold text-gray-700 uppercase tracking-wide">
        {{ product.category }}
      </span>

      <h3 class="font-bold text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors">
        {{ product.title }}
      </h3>

      <div class="flex items-center gap-1">
        <div class="flex text-yellow-400">
          <font-awesome-icon 
            v-for="i in 5" 
            :key="i"
            icon="star"
            class="w-4 h-4"
            :class="i <= Math.round(product.rating) ? '' : 'text-gray-300'"
          />
        </div>
        <span class="text-sm text-gray-600 ml-1">
          {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <div class="flex items-baseline gap-2 pt-2">
        <span class="text-2xl font-bold text-gray-900">
          {{ formatPrice(product.price) }}
        </span>
        <span 
          v-if="product.discountPercentage > 0"
          class="text-sm text-gray-500 line-through"
        >
          {{ formatPrice(product.price / (1 - product.discountPercentage / 100)) }}
        </span>
      </div>

      <p class="text-sm text-gray-500">
        Marca: <span class="font-semibold">{{ product.brand }}</span>
      </p>

      <button 
        class="w-full mt-4 btn-primary text-sm"
        @click.stop="goToDetail"
      >
        Ver Detalle
      </button>
    </div>
  </div>
</template>
