import Vue from 'vue'
import App from '@/App'

new Vue({
  el: '#app',
  render: h => h(App),
})

if (module.hot) {
  module.hot.accept(
    err => {
      console.error(err)
    },
  )
}
