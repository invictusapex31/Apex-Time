import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { getWeekDates, getDateString } from '../lib/utils'
import { cn } from '../lib/utils'

export const StreakVisualization = memo(function StreakVisualization({ habit }) {
  const weekDates = useMemo(() => getWeekDates(), [])
  const today = useMemo(() => getDateString(), [])

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center space-x-2">
          <span className="text-2xl">{habit.icon}</span>
          <span>{habit.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center space-x-1">
          {weekDates.map((date, index) => {
            const dateStr = getDateString(date)
            const isCompleted = habit.completions[dateStr]
            const isToday = dateStr === today
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })

            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center space-y-1 flex-1"
              >
                <span className="text-xs text-muted-foreground font-medium">
                  {dayName}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                    isCompleted
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : isToday
                      ? "border-2 border-primary bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? '✓' : date.getDate()}
                </motion.div>
                {isToday && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
})

export function StreakStats({ habits }) {
  const totalHabits = habits.length
  const todayCompletions = habits.filter(habit => {
    const today = getDateString()
    return habit.completions[today]
  }).length

  const longestStreak = Math.max(
    ...habits.map(habit => {
      let maxStreak = 0
      let currentStreak = 0
      const sortedDates = Object.keys(habit.completions)
        .filter(date => habit.completions[date])
        .sort()

      for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
          currentStreak = 1
        } else {
          const prevDate = new Date(sortedDates[i - 1])
          const currentDate = new Date(sortedDates[i])
          const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24)

          if (dayDiff === 1) {
            currentStreak++
          } else {
            currentStreak = 1
          }
        }
        maxStreak = Math.max(maxStreak, currentStreak)
      }
      return maxStreak
    }),
    0
  )

  const completionRate = totalHabits > 0 ? Math.round((todayCompletions / totalHabits) * 100) : 0

  return (
    <div className="grid grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{todayCompletions}</div>
            <div className="text-sm text-muted-foreground">Today</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{longestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Today's Rate</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}