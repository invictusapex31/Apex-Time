import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Check } from 'lucide-react'
import { Card, CardContent } from './ui/Card'
import { Button } from './ui/Button'
import { useHabits } from '../context/HabitContext'
import { cn } from '../lib/utils'

export const HabitCard = memo(function HabitCard({ habit }) {
  const { toggleHabitCompletion, getHabitStreak, isHabitCompletedToday, deleteHabit } = useHabits()
  
  const isCompleted = isHabitCompletedToday(habit.id)
  const streak = getHabitStreak(habit.id)

  const handleToggle = () => {
    toggleHabitCompletion(habit.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteHabit(habit.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card 
        className={cn(
          "transition-all duration-300 hover:shadow-xl group relative overflow-hidden",
          isCompleted && "glow"
        )}
        onClick={handleToggle}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground hover:border-primary"
                )}
                whileTap={{ scale: 0.9 }}
              >
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check size={14} />
                  </motion.div>
                )}
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{habit.icon}</span>
                  <h3 className={cn(
                    "font-medium transition-all duration-200",
                    isCompleted && "line-through text-muted-foreground"
                  )}>
                    {habit.name}
                  </h3>
                </div>
                {habit.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {habit.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium"
                >
                  <span>🔥</span>
                  <span>{streak}</span>
                </motion.div>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})