<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useProductosStore } from '@/stores/productos.store'
import ProductCard from '@/components/ProductCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'

const store = useProductosStore()

onMounted(async () => {
  await store.fetchCategories()
  await store.fetchProducts()
})

const handleSearch = (searchTerm: string) => {
  store.setSearchTerm(searchTerm)
}

const handleCategoryChange = (category: string) => {
  store.setCategory(category)
}

const handleResetFilters = () => {
  store.resetFilters()
}

watch(() => store.currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Dashboard de Productos
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora nuestra colección completa de productos. Busca, filtra y encuentra exactamente lo que necesitas.
        </p>
      </div>
      <div class="glass-card p-6 mb-8 space-y-6">
        <SearchBar
          v-model="store.searchTerm"
          @search="handleSearch"
          placeholder="Buscar productos por nombre..."
        />
        <CategoryFilter
          v-model="store.selectedCategory"
          :categories="store.categories"
          :loading="store.loadingCategories"
          @update:model-value="handleCategoryChange"
        />
        <div 
          v-if="store.searchTerm || store.selectedCategory"
          class="flex items-center gap-4 pt-4 border-t border-gray-200"
        >
          <span class="text-sm font-semibold text-gray-700">Filtros activos:</span>
          <div class="flex gap-2 flex-wrap">
            <span 
              v-if="store.searchTerm"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            >
              Búsqueda: "{{ store.searchTerm }}"
            </span>
            <span 
              v-if="store.selectedCategory"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
            >
              Categoría: {{ store.selectedCategory }}
            </span>
          </div>
          <button
            @click="handleResetFilters"
            class="ml-auto text-sm text-red-600 hover:text-red-700 font-semibold underline"
          >
            Limpiar todo
          </button>
        </div>
      </div>
      <div 
        v-if="!store.loading"
        class="mb-6 text-center sm:text-left"
      >
        <p class="text-gray-600">
          <span class="font-bold text-gray-900">{{ store.totalProducts }}</span>
          {{ store.totalProducts === 1 ? 'producto encontrado' : 'productos encontrados' }}
        </p>
      </div>
      <LoadingSkeleton v-if="store.loading" :count="store.itemsPerPage" />
      <EmptyState
        v-else-if="store.error"
        :title="store.error"
        message="Ha ocurrido un error al cargar los productos. Por favor, intenta nuevamente."
        icon="error"
        action-text="Reintentar"
        @action="store.fetchProducts"
      />
      <EmptyState
        v-else-if="store.products.length === 0"
        title="No se encontraron productos"
        message="Intenta ajustar tus filtros de búsqueda o explora otras categorías"
        icon="search"
        @action="handleResetFilters"
      />
      <div 
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <ProductCard
          v-for="product in store.products"
          :key="product.id"
          :product="product"
        />
      </div>
      <Pagination
        v-if="!store.loading && store.products.length > 0"
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        :has-next="store.hasNextPage"
        :has-previous="store.hasPreviousPage"
        :total-items="store.totalProducts"
        :items-per-page="store.itemsPerPage"
        @next="store.nextPage"
        @previous="store.previousPage"
        @go-to-page="store.goToPage"
      />
    </div>
  </div>
</template>
