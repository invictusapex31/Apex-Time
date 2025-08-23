import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useHabits } from '../context/HabitContext'

const HABIT_ICONS = ['🎯', '📚', '🏃‍♂️', '🧘‍♀️', '💧', '🌱', '💻', '🎨', '📝', '🍎', '😴', '🎵']

export function AddHabitForm({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('🎯')
  const { addHabit } = useHabits()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    addHabit(name.trim(), description.trim(), selectedIcon)
    setName('')
    setDescription('')
    setSelectedIcon('🎯')
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setDescription('')
    setSelectedIcon('🎯')
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
          onClick={handleCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="glow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gradient">Add New Habit</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Habit Name</label>
                    <Input
                      placeholder="e.g., Read for 30 minutes"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description (optional)</label>
                    <Input
                      placeholder="e.g., Read personal development books"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Choose Icon</label>
                    <div className="grid grid-cols-6 gap-2">
                      {HABIT_ICONS.map((icon) => (
                        <motion.button
                          key={icon}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 text-2xl rounded-xl flex items-center justify-center transition-all duration-200 ${
                            selectedIcon === icon
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                          onClick={() => setSelectedIcon(icon)}
                        >
                          {icon}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!name.trim()}
                    >
                      Add Habit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}