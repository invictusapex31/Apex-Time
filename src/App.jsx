import React from 'react'
import { HabitProvider } from './context/HabitContext'
import { Dashboard } from './components/Dashboard'
import './index.css'

function App() {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Dashboard />
      </div>
    </HabitProvider>
  )
}

export default App