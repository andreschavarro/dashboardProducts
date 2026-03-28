import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductCategory } from '@/types/product'
import { productService } from '@/services/product.service'

export const useProductosStore = defineStore('productos', () => {
  // State
  const products = ref<Product[]>([])
  const categories = ref<ProductCategory[]>([])
  const currentProduct = ref<Product | null>(null)
  
  // Loading states
  const loading = ref(false)
  const loadingProduct = ref(false)
  const loadingCategories = ref(false)
  
  // Error state
  const error = ref<string | null>(null)
  
  // Filters
  const searchTerm = ref('')
  const selectedCategory = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(12)
  
  // Total count for pagination
  const totalProducts = ref(0)

  // Computed
  const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage.value))
  
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  // Actions
  async function fetchProducts() {
    try {
      loading.value = true
      error.value = null
      
      const skip = (currentPage.value - 1) * itemsPerPage.value
      
      let response
      
      if (searchTerm.value) {
        response = await productService.searchProducts(searchTerm.value, itemsPerPage.value)
      } else if (selectedCategory.value) {
        response = await productService.getProductsByCategory(
          selectedCategory.value,
          itemsPerPage.value,
          skip
        )
      } else {
        response = await productService.getProducts(itemsPerPage.value, skip)
      }
      
      products.value = response.products
      totalProducts.value = response.total
    } catch (err) {
      error.value = 'Error al cargar los productos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: number) {
    try {
      loadingProduct.value = true
      error.value = null
      currentProduct.value = await productService.getProductById(id)
    } catch (err) {
      error.value = 'Error al cargar el producto'
      console.error(err)
    } finally {
      loadingProduct.value = false
    }
  }

  async function fetchCategories() {
    try {
      loadingCategories.value = true
      categories.value = await productService.getCategories()
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    } finally {
      loadingCategories.value = false
    }
  }

  function setSearchTerm(term: string) {
    searchTerm.value = term
    currentPage.value = 1
    fetchProducts()
  }

  function setCategory(category: string) {
    selectedCategory.value = category
    currentPage.value = 1
    fetchProducts()
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
      fetchProducts()
    }
  }

  function previousPage() {
    if (hasPreviousPage.value) {
      currentPage.value--
      fetchProducts()
    }
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchProducts()
    }
  }

  function resetFilters() {
    searchTerm.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
    fetchProducts()
  }

  return {
    // State
    products,
    categories,
    currentProduct,
    loading,
    loadingProduct,
    loadingCategories,
    error,
    searchTerm,
    selectedCategory,
    currentPage,
    itemsPerPage,
    totalProducts,
    
    // Computed
    totalPages,
    hasNextPage,
    hasPreviousPage,
    
    // Actions
    fetchProducts,
    fetchProductById,
    fetchCategories,
    setSearchTerm,
    setCategory,
    nextPage,
    previousPage,
    goToPage,
    resetFilters,
  }
})
