import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/app.css';
import '@/assets/styles/flexy.css';

createApp(App).use(router).mount('#app')
