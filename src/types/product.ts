export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductCategory {
  slug: string
  name: string
  url: string
}

export interface ProductFilters {
  searchTerm: string
  selectedCategory: string
  currentPage: number
  itemsPerPage: number
}
