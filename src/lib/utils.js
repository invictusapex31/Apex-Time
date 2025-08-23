import { clsx } from "clsx"

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

export function getDateString(date = new Date()) {
  return date.toISOString().split('T')[0]
}

export function calculateStreak(completions) {
  const today = getDateString()
  const sortedDates = Object.keys(completions)
    .filter(date => completions[date])
    .sort()
    .reverse()

  if (!sortedDates.includes(today) && sortedDates.length > 0) {
    const yesterday = getDateString(new Date(Date.now() - 86400000))
    if (!sortedDates.includes(yesterday)) {
      return 0
    }
  }

  let streak = 0
  let currentDate = new Date()
  
  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = getDateString(currentDate)
    if (sortedDates.includes(dateStr) && completions[dateStr]) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}

export function getWeekDates() {
  const dates = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date)
  }
  
  return dates
}