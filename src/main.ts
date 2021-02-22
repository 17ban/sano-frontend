import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './view/App.vue'

async function appInit() {
  //create vue app instance
  const vueApp = createApp(App)

  //use vue-router
  vueApp.use(router)
  await router.isReady()

  //mount the vue app instance to the DOM
  vueApp.mount('#app')
}
appInit()
