<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProductosStore } from '@/stores/productos.store'
import { useFormatters } from '@/composables/useFormatters'

const route = useRoute()
const router = useRouter()
const store = useProductosStore()
const { formatPrice } = useFormatters()

const currentImageIndex = ref(0)

onMounted(async () => {
  const productId = Number(route.params.id)
  if (isNaN(productId) || productId <= 0) {
    router.push('/')
    return
  }
  await store.fetchProductById(productId)
})

const goBack = () => {
  router.push('/')
}

const changeImage = (index: number) => {
  currentImageIndex.value = index
}

const product = () => store.currentProduct
</script>

<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <button @click="goBack" class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
        <font-awesome-icon icon="arrow-left" class="w-5 h-5" />
        <span class="font-medium">Volver a productos</span>
      </button>
      <div v-if="store.loadingProduct" class="glass-card p-8">
        <div class="animate-pulse">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="aspect-square bg-gray-300 rounded-2xl"></div>
            <div class="space-y-4">
              <div class="h-8 bg-gray-300 rounded w-3/4"></div>
              <div class="h-6 bg-gray-300 rounded w-1/2"></div>
              <div class="h-4 bg-gray-300 rounded w-full"></div>
              <div class="h-4 bg-gray-300 rounded w-full"></div>
              <div class="h-4 bg-gray-300 rounded w-2/3"></div>
              <div class="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="store.error" class="glass-card p-12 text-center">
        <div class="flex justify-center mb-6">
          <font-awesome-icon icon="exclamation-circle" class="w-24 h-24 text-red-300" />
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar el producto</h3>
        <p class="text-gray-600 mb-6">{{ store.error }}</p>
        <button @click="goBack" class="btn-primary">
          Volver a productos
        </button>
      </div>
      <div v-else-if="product()" class="glass-card overflow-hidden">
        <div class="grid md:grid-cols-2 gap-8 p-8">
          <div class="space-y-4">
            <div class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
              <img :src="product()!.images[currentImageIndex]" :alt="product()!.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span v-if="product()!.discountPercentage > 0"
                  class="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                  -{{ Math.round(product()!.discountPercentage) }}% OFF
                </span>
                <span v-if="product()!.stock < 10"
                  class="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                  ¡Solo {{ product()!.stock }} disponibles!
                </span>
              </div>
            </div>
            <div class="flex gap-2 overflow-x-auto pb-2">
              <button v-for="(image, index) in product()!.images" :key="index" @click="changeImage(index)" :class="[
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300',
                currentImageIndex === index
                  ? 'border-gray-700 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              ]">
                <img :src="image" :alt="`${product()!.title} - ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          <div class="space-y-6">
            <span
              class="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold uppercase tracking-wide">
              {{ product()!.category }}
            </span>
            <h1 class="text-4xl font-bold text-gray-900">
              {{ product()!.title }}
            </h1>
            <div class="flex items-center gap-3">
              <div class="flex text-yellow-400">
                <font-awesome-icon v-for="i in 5" :key="i" icon="star" class="w-6 h-6"
                  :class="i <= Math.round(product()!.rating) ? '' : 'text-gray-300'" />
              </div>
              <span class="text-lg font-semibold text-gray-700">
                {{ product()!.rating.toFixed(1) }} / 5.0
              </span>
            </div>
            <div class="space-y-2">
              <div class="flex items-baseline gap-4">
                <span class="text-5xl font-bold text-gray-900">
                  {{ formatPrice(product()!.price) }}
                </span>
                <span v-if="product()!.discountPercentage > 0" class="text-2xl text-gray-500 line-through">
                  {{ formatPrice(product()!.price / (1 - product()!.discountPercentage / 100)) }}
                </span>
              </div>
              <p v-if="product()!.discountPercentage > 0" class="text-green-600 font-semibold">
                Ahorras {{ formatPrice((product()!.price / (1 - product()!.discountPercentage / 100)) -
                product()!.price) }}
              </p>
            </div>
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
              <p class="text-gray-700 leading-relaxed">
                {{ product()!.description }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div class="space-y-1">
                <p class="text-sm text-gray-600">Marca</p>
                <p class="font-semibold text-gray-900">{{ product()!.brand }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-gray-600">Stock disponible</p>
                <p class="font-semibold text-gray-900">{{ product()!.stock }} unidades</p>
              </div>
            </div>
            <div class="flex gap-4 pt-6">
              <button class="flex-1 btn-primary text-lg py-4">
                <font-awesome-icon icon="shopping-cart" /> Agregar al carrito
              </button>
              <button
                class="px-6 bg-white/70 border-2 border-gray-300 rounded-xl font-semibold hover:bg-white hover:border-gray-700 transition-all duration-300">
                <font-awesome-icon icon="heart" class="w-6 h-6" />
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <font-awesome-icon icon="truck" class="w-5 h-5 text-gray-700" />
                <span>Envío gratis en compras mayores a $50</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <font-awesome-icon icon="shield" class="w-5 h-5 text-gray-700" />
                <span>Garantía de satisfacción 100%</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <font-awesome-icon icon="rotate-left" class="w-5 h-5 text-gray-700" />
                <span>Pago seguro y protegido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
