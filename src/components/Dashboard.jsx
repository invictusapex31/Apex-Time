import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { HabitCard } from './HabitCard'
import { AddHabitForm } from './AddHabitForm'
import { AIHabitSuggestions } from './AIHabitSuggestions'
import { StreakVisualization, StreakStats } from './StreakVisualization'
import { useHabits } from '../context/HabitContext'
import { formatDate } from '../lib/utils'

export function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const { habits } = useHabits()

  const today = new Date()
  const todayFormatted = formatDate(today)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-gradient">
            Habit Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Build better habits, one day at a time • {todayFormatted}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StreakStats habits={habits} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => setShowAddForm(true)}
            size="lg"
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add New Habit</span>
          </Button>
          <Button
            onClick={() => setShowAISuggestions(true)}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <Sparkles size={20} />
            <span>AI Suggestions</span>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Habits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>Today's Habits</span>
                  <span className="text-sm text-muted-foreground font-normal">
                    ({habits.length} total)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {habits.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="text-6xl">🎯</div>
                      <h3 className="text-xl font-medium">No habits yet</h3>
                      <p className="text-muted-foreground">
                        Add your first habit to start building a better you
                      </p>
                      <Button
                        onClick={() => setShowAddForm(true)}
                        className="mt-4"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Your First Habit
                      </Button>
                    </motion.div>
                  ) : (
                    habits.map((habit) => (
                      <HabitCard key={habit.id} habit={habit} />
                    ))
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp size={20} />
                  <span>Weekly Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {habits.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Add habits to see progress
                  </div>
                ) : (
                  <AnimatePresence>
                    {habits.slice(0, 3).map((habit) => (
                      <motion.div
                        key={habit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <StreakVisualization habit={habit} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
                {habits.length > 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-muted-foreground pt-2"
                  >
                    +{habits.length - 3} more habits
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="glass">
            <CardContent className="p-6">
              <blockquote className="text-lg italic text-muted-foreground">
                "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
              </blockquote>
              <cite className="text-sm text-primary font-medium block mt-2">
                — Aristotle
              </cite>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <AddHabitForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
      />
      <AIHabitSuggestions
        isOpen={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
      />
    </div>
  )
}