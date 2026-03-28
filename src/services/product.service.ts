import axios from 'axios'
import type { Product, ProductsResponse, ProductCategory } from '@/types/product'

const API_BASE_URL = 'https://dummyjson.com'

export const productService = {

  async getProducts(limit: number = 20, skip: number = 0): Promise<ProductsResponse> {
    const { data } = await axios.get<ProductsResponse>(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
    )
    return data
  },

  async searchProducts(query: string, limit: number = 20): Promise<ProductsResponse> {
    const { data } = await axios.get<ProductsResponse>(
      `${API_BASE_URL}/products/search?q=${query}&limit=${limit}`
    )
    return data
  },

  async getProductsByCategory(category: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> {
    const { data } = await axios.get<ProductsResponse>(
      `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    )
    return data
  },

  async getProductById(id: number): Promise<Product> {
    const { data } = await axios.get<Product>(`${API_BASE_URL}/products/${id}`)
    return data
  },

  async getCategories(): Promise<ProductCategory[]> {
    const { data } = await axios.get<ProductCategory[]>(
      `${API_BASE_URL}/products/categories`
    )
    return data
  },
}
