
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { 
    path: '/', 
    component: () => import('@/views/ProductsView.vue'),
    name: 'Products'
  },
  { 
    path: '/product/:id', 
    component: () => import('@/views/ProductDetail.vue'),
    name: 'ProductDetail'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})