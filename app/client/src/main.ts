import { createApp } from 'vue'
import Varlet from "@varlet/ui"
import '@varlet/ui/es/style.js'
import App from './App.vue'

createApp(App).use(Varlet).mount('#app')