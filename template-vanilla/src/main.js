import '@/App.css'

const app = document.getElementById('app')
app.innerHTML = '<h1 class="hello-world">Hello World!</h1>'
app.addEventListener('click', () => {
  app.innerHTML = '<h1 class="hello-world">Good Luck!</h1>'
}, {
  once: true,
})

if (module.hot) {
  module.hot.accept(
    err => {
      console.error(err)
    },
  )
}
