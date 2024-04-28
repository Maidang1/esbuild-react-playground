import { createApp } from 'vue'
import 'virtual:uno.css';
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
