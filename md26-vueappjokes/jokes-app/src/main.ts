import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fasStar, farStar)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
