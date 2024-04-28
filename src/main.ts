import { createApp } from 'vue'
import { createPinia } from "pinia"
import PrimeVue from "primevue/config";

import 'virtual:uno.css';
import './style.css'
import App from './App.vue'
import './hooks/useWorker'

const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.mount('#app')
