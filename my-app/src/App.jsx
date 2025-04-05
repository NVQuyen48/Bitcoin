// import { useState } from 'react'

import Header from './components/Header'
import Home from './components/Home'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
        <Header/>
        <Home/>
      </div>
    
    </>
  )
}

export default App
