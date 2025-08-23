# 🎯 Habit Tracker

A minimal, aesthetic habit tracker with AI-powered suggestions to help you build and maintain daily habits.

![Habit Tracker](https://img.shields.io/badge/Version-1.0.0-green) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.5-cyan)

## ✨ Features

- **🎨 Minimal & Aesthetic UI**: Dark theme with green accents, rounded cards, and smooth animations
- **📊 Streak Tracking**: Visual streak counters and weekly progress charts
- **🤖 AI Habit Suggestions**: Get personalized habit recommendations based on your goals
- **💾 Local Storage**: Persistent data storage (ready for MongoDB integration)
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🎭 Smooth Animations**: Framer Motion powered interactions
- **⚡ Fast Performance**: Optimized build with code splitting

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone or download the project
cd habit-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: localStorage (MongoDB ready)
- **AI**: Placeholder integration (OpenAI API ready)

## 📱 Usage

### Adding Habits
1. Click "Add New Habit" button
2. Enter habit name and optional description
3. Choose an emoji icon
4. Save your habit

### AI Suggestions
1. Click "AI Suggestions" button
2. Describe your goals (e.g., "I want to be more productive")
3. Get personalized habit recommendations
4. Add suggested habits with one click

### Tracking Progress
- Click habit cards to mark as complete/incomplete
- View streak counters and weekly progress
- See completion statistics

### Managing Habits
- Hover over habits to see delete option
- Track multiple habits simultaneously
- View completion history

## 🎨 UI Style Guide

- **Color Scheme**: Black background with green (#22C55E) accents
- **Typography**: System fonts with proper hierarchy
- **Cards**: Rounded corners (2xl), soft shadows, backdrop blur
- **Animations**: Smooth transitions, spring physics
- **Icons**: Emoji-based with Lucide React supplements

## 🚧 Future Roadmap

### Phase 1 (Current)
- ✅ Core habit tracking
- ✅ Local storage persistence
- ✅ AI suggestion placeholders
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] OpenAI API integration
- [ ] User authentication (Google/GitHub)
- [ ] MongoDB cloud storage
- [ ] Cross-device sync

### Phase 3 (Future)
- [ ] Push notifications
- [ ] Habit templates
- [ ] Social features
- [ ] Export/import data
- [ ] Advanced analytics

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HabitCard.jsx   # Individual habit display
│   ├── Dashboard.jsx   # Main dashboard
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css          # Global styles
```

### Key Files

- `src/App.jsx` - Main application component
- `src/context/HabitContext.jsx` - Habit state management
- `src/components/Dashboard.jsx` - Main dashboard layout
- `src/hooks/useLocalStorage.js` - Persistent storage hook
- `tailwind.config.js` - Tailwind configuration
- `vite.config.js` - Vite build configuration

### Adding AI Integration

To connect real OpenAI API:

1. Add your API key to environment variables:
```bash
echo "VITE_OPENAI_API_KEY=your_api_key_here" > .env.local
```

2. Replace the placeholder function in `src/components/AIHabitSuggestions.jsx`:
```javascript
async function generateAISuggestions(goal) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful habit coach. Suggest 4 specific, actionable daily habits based on the user\'s goals.'
        },
        {
          role: 'user',
          content: `My goals: ${goal}`
        }
      ],
    }),
  });
  
  const data = await response.json();
  // Parse and return suggestions
}
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Tips

- **Best Practices**: Start with 2-3 habits maximum
- **Consistency**: Focus on daily completion over perfection
- **Review**: Check your progress weekly to stay motivated
- **Flexibility**: Adjust habits as your goals evolve

---

Built with ❤️ for better habit formation
