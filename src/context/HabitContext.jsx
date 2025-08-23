import React, { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getDateString, calculateStreak } from '../lib/utils'

const HabitContext = createContext()

export function useHabits() {
  const context = useContext(HabitContext)
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider')
  }
  return context
}

export function HabitProvider({ children }) {
  const [habits, setHabits] = useLocalStorage('habits', [])

  const addHabit = useCallback((name, description = '', icon = '🎯') => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      description,
      icon,
      createdAt: new Date().toISOString(),
      completions: {}
    }
    setHabits(prev => [...prev, newHabit])
    return newHabit
  }, [setHabits])

  const deleteHabit = useCallback((habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId))
  }, [setHabits])

  const toggleHabitCompletion = useCallback((habitId, date = getDateString()) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const completions = { ...habit.completions }
        completions[date] = !completions[date]
        return { ...habit, completions }
      }
      return habit
    }))
  }, [setHabits])

  const getHabitStreak = useCallback((habitId) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return 0
    return calculateStreak(habit.completions)
  }, [habits])

  const isHabitCompletedToday = useCallback((habitId) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return false
    const today = getDateString()
    return habit.completions[today] || false
  }, [habits])

  const getTodaysCompletions = useCallback(() => {
    const today = getDateString()
    return habits.filter(habit => habit.completions[today])
  }, [habits])

  const value = {
    habits,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitStreak,
    isHabitCompletedToday,
    getTodaysCompletions
  }

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  )
}