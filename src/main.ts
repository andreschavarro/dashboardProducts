import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faSearch, 
  faXmark, 
  faShoppingCart, 
  faArrowLeft, 
  faExclamationCircle, 
  faBox, 
  faFilter, 
  faChevronLeft, 
  faChevronRight,
  faTag,
  faTruck,
  faShield,
  faRotateLeft,
  faStar,
  faStore
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch, 
  faXmark, 
  faShoppingCart, 
  faArrowLeft, 
  faExclamationCircle, 
  faBox, 
  faFilter, 
  faChevronLeft, 
  faChevronRight,
  faTag,
  faTruck,
  faShield,
  faRotateLeft,
  faStar,
  faStore
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
