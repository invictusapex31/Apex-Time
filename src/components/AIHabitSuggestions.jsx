import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Plus, Loader2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useHabits } from '../context/HabitContext'

// Placeholder AI suggestions - in real app, this would call OpenAI API
const HABIT_SUGGESTIONS = {
  productivity: [
    { name: 'Code for 1 hour', description: 'Practice programming skills daily', icon: '💻' },
    { name: 'Plan tomorrow today', description: 'End each day by planning the next', icon: '📋' },
    { name: 'Focus blocks', description: '25-minute deep work sessions', icon: '🎯' },
    { name: 'Learn something new', description: 'Dedicate time to skill development', icon: '📚' },
  ],
  health: [
    { name: 'Drink 8 glasses of water', description: 'Stay hydrated throughout the day', icon: '💧' },
    { name: 'Take 10,000 steps', description: 'Stay active with daily walking', icon: '🚶‍♂️' },
    { name: 'Eat a healthy breakfast', description: 'Start the day with nutritious food', icon: '🥗' },
    { name: 'Get 8 hours of sleep', description: 'Prioritize quality rest', icon: '😴' },
  ],
  mindfulness: [
    { name: 'Meditate for 10 minutes', description: 'Practice mindfulness daily', icon: '🧘‍♀️' },
    { name: 'Write in journal', description: 'Reflect on thoughts and feelings', icon: '📝' },
    { name: 'Practice gratitude', description: 'List 3 things you\'re grateful for', icon: '🙏' },
    { name: 'Deep breathing exercise', description: '5 minutes of conscious breathing', icon: '🌬️' },
  ],
  learning: [
    { name: 'Read for 30 minutes', description: 'Expand knowledge through books', icon: '📚' },
    { name: 'Practice a language', description: 'Learn 10 new words daily', icon: '🗣️' },
    { name: 'Watch educational videos', description: 'Learn from online courses', icon: '🎥' },
    { name: 'Practice a skill', description: 'Dedicate time to hobby development', icon: '🎨' },
  ]
}

function generateAISuggestions(goal) {
  // Simulate AI processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const goalLower = goal.toLowerCase()
      
      if (goalLower.includes('productive') || goalLower.includes('work') || goalLower.includes('career')) {
        resolve(HABIT_SUGGESTIONS.productivity)
      } else if (goalLower.includes('health') || goalLower.includes('fit') || goalLower.includes('exercise')) {
        resolve(HABIT_SUGGESTIONS.health)
      } else if (goalLower.includes('mindful') || goalLower.includes('mental') || goalLower.includes('peace')) {
        resolve(HABIT_SUGGESTIONS.mindfulness)
      } else if (goalLower.includes('learn') || goalLower.includes('study') || goalLower.includes('skill')) {
        resolve(HABIT_SUGGESTIONS.learning)
      } else {
        // Mix of different categories for general goals
        const mixed = [
          ...HABIT_SUGGESTIONS.productivity.slice(0, 1),
          ...HABIT_SUGGESTIONS.health.slice(0, 1),
          ...HABIT_SUGGESTIONS.mindfulness.slice(0, 1),
          ...HABIT_SUGGESTIONS.learning.slice(0, 1),
        ]
        resolve(mixed)
      }
    }, 1500) // Simulate API call delay
  })
}

export function AIHabitSuggestions({ isOpen, onClose }) {
  const [goal, setGoal] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { addHabit } = useHabits()

  const handleGenerateSuggestions = async (e) => {
    e.preventDefault()
    if (!goal.trim()) return

    setIsLoading(true)
    try {
      const aiSuggestions = await generateAISuggestions(goal)
      setSuggestions(aiSuggestions)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddHabit = (suggestion) => {
    addHabit(suggestion.name, suggestion.description, suggestion.icon)
  }

  const handleClose = () => {
    setGoal('')
    setSuggestions([])
    setShowSuggestions(false)
    setIsLoading(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <Card className="glow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gradient flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>AI Habit Suggestions</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showSuggestions ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <form onSubmit={handleGenerateSuggestions} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">What are your goals?</label>
                        <Input
                          placeholder="e.g., I want to be more productive and healthy"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          autoFocus
                          disabled={isLoading}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={!goal.trim() || isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? 'Generating...' : 'Get AI Suggestions'}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Suggested Habits for: "{goal}"</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSuggestions(false)}
                      >
                        Try Again
                      </Button>
                    </div>
                    
                    <div className="grid gap-3">
                      {suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="hover:shadow-lg transition-all duration-200 group">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <span className="text-2xl">{suggestion.icon}</span>
                                  <div>
                                    <h4 className="font-medium">{suggestion.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {suggestion.description}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleAddHabit(suggestion)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  <Plus size={16} className="mr-1" />
                                  Add
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}