import '@/App.css'

const app = document.getElementById('app')
app.innerHTML = '<h1>Hello World</h1>'

if (module.hot) {
  module.hot.accept(
    err => {
      console.error(err)
    },
  )
}
