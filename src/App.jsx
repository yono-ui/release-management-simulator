import React from 'react'
import Home from './pages/Home'

export default function App(){
  return (
    <div className="app">
      <header className="app-header">
        <h1>Release Management Simulator</h1>
      </header>
      <main className="app-main">
        <Home />
      </main>
      <footer className="app-footer">
        Academic project — Configuration Management (Release Management)
      </footer>
    </div>
  )
}
