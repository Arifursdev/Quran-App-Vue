import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import lazySizes from 'lazysizes'

lazySizes.init();

const app = createApp(App)

app.use(store)

app.config.globalProperties.axios = axios

app.mount('#app')
