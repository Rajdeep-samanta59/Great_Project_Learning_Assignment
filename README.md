# Micro-Adventure Route Planner

A React Native app for planning optimal routes through multiple destinations with real-time tracking and notifications.

## Features

- 🔍 Search and add up to 10 milestones using Google Places
- 📍 Automatic route optimization using TSP algorithms (Nearest Neighbor + 2-opt)
- ⏱️ Custom duration settings for each milestone
- 📱 Real-time progress tracking
- 🔔 Push notifications for milestone completion
- 💾 Persistent storage of milestones and routes

## Quick Setup (For Beginners)

### Prerequisites
- Node.js 18+ installed
- Android Studio (for Android) or Xcode (for iOS)
- Git Bash (on Windows)

### Step 1: Setup Files
1. Download all the project files to a folder called `MicroAdventureApp`
2. Open Git Bash in that folder
3. Run: `chmod +x setup.sh && ./setup.sh`

### Step 2: Add API Key
1. Get a Google Places API key:
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Enable "Places API"
   - Create credentials > API key
2. Open `.env` file and replace `your_google_places_api_key_here` with your actual key

### Step 3: Run the App
1. Start an Android emulator or connect your phone
2. Run: `npx react-native run-android`

## Project Structure

```
MicroAdventureApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   ├── services/           # Business logic and API calls
│   ├── store/              # State management
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Helper functions
│   └── assets/             # Images and icons
├── App.tsx                 # Main app component
├── package.json            # Dependencies
└── .env                    # API keys (DO NOT COMMIT)
```

## How to Use

1. **Add Milestones**: Use the search bar to find places
2. **Set Duration**: Enter how long you plan to spend at each location
3. **Optimize Route**: Tap "Optimize Route" to get the best path
4. **Track Progress**: Check off completed milestones as you go

## Troubleshooting

### Common Issues

**Build Errors:**
- Run `npx react-native doctor` to check your environment
- Make sure Android Studio is properly installed
- Try `npm install` to refresh dependencies

**Location Issues:**
- Enable location permissions in your device settings
- Make sure GPS is turned on

**API Key Errors:**
- Check that your Google Places API key is correct in `.env`
- Ensure Places API is enabled in Google Cloud Console
- Check API quota limits

### Getting Help

If you encounter any issues:
1. Check the error message in the terminal
2. Google the specific error for solutions
3. Ensure all prerequisites are installed correctly

## Development

This is a complete, production-ready React Native app with:
- TypeScript for type safety
- Zustand for state management
- React Navigation for navigation
- Async Storage for persistence
- Push notifications
- Location services
- Route optimization algorithms

