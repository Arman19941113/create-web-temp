import { createApp } from 'vue'
import App from './App'

const app = createApp(App)

app.mount('#app')

if (module.hot) {
  module.hot.accept(
    err => {
      console.error(err)
    },
  )
}
