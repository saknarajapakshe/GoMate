# GoMate 🚌🚂

A beautiful mobile travel and transport application for Sri Lanka, helping users explore public transport, find routes & schedules, and plan their trips efficiently.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)

## 📱 Features

- **🗺️ Interactive Maps** - View bus stops, train stations, and routes on an interactive map
- **🔍 Smart Search** - Find routes, destinations, and schedules quickly
- **⭐ Favorites** - Save your frequently used routes and destinations
- **🚌 Multi-Transport** - Support for buses, trains, and popular destinations
- **👤 User Profiles** - Personalized experience with activity tracking
- **🌓 Dark Mode** - Easy on the eyes, day or night
- **🌐 Multi-Language** - Support for English, Sinhala, and Tamil

## 🎨 Design

GoMate features a beautiful UI inspired by Sri Lankan flag colors: 

- **Primary (Blood Red)**: #8D153A
- **Secondary (Golden Yellow)**: #FDB913
- **Accent Green**: #00534E
- **Accent Orange**:  #E57200

The app includes 11 polished screens with smooth animations, intuitive navigation, and a mobile-first responsive design.

## 📸 Screenshots

*Coming soon*

## 🏗️ Project Structure

```
GoMate/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── services/              # API and data services
├── store/                 # Redux state management
├── scripts/               # Utility scripts
├── global.css             # Global styles
├── tailwind.config.js     # Tailwind configuration
└── App_Structure.md       # Detailed app structure documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saknarajapakshe/GoMate.git
   cd GoMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📦 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Maps**: [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 🛠️ Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset project to initial state

## 📱 App Screens

1. **Splash Screen** - App logo with animated transition
2. **Onboarding** - 3-slide introduction to app features
3. **Login/Register** - User authentication
4. **Home** - Main dashboard with buses, trains, and destinations
5. **Details** - Route information and timetables
6. **Search** - Find routes and destinations
7. **Map** - Interactive map with markers
8. **Favorites** - Saved routes and destinations
9. **Profile** - User information and statistics
10. **Settings** - App preferences and configuration

See [App_Structure.md](./App_Structure.md) for detailed screen specifications.

## 🗺️ Roadmap

- [ ] Real-time bus/train tracking
- [ ] Push notifications for route updates
- [ ] Offline mode support
- [ ] Trip planner with multi-leg journeys
- [ ] User reviews and ratings
- [ ] Integration with payment systems
- [ ] AR navigation features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not currently licensed for public use.

## 👤 Author

**saknarajapakshe**

- GitHub: [@saknarajapakshe](https://github.com/saknarajapakshe)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community
- All contributors and testers

---

<div align="center">
Made with ❤️ for Sri Lankan travelers
</div>
