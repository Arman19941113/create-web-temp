import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import appStyles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <main className={appStyles.mainWrapper}>
      <h1>You clicked {count} times</h1>
      <h1 className={appStyles.buttonText} onClick={handleClick}>
        Click me
      </h1>
    </main>
  )
}

export default hot(App)
