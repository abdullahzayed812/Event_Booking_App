# Event Booking App

A React Native application for browsing and registering for events, built with TypeScript, Redux Toolkit, and React Navigation.

## Features

- **User Authentication**: Sign up and login functionality
- **Event Browsing**: View a list of available events with details
- **Event Registration**: Register for events with real-time availability tracking
- **User Dashboard**: View registered events and manage bookings
- **State Management**: Redux Toolkit with RTK Query for efficient data fetching
- **Navigation**: Bottom tab navigation with stack navigation for details

## Tech Stack

- React Native 0.72.6
- TypeScript
- Redux Toolkit & RTK Query
- React Navigation 6
- React Native Vector Icons
- Mock API with JSON data source

## Prerequisites

- Node.js (>= 16.x)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd EventBookingApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Ensure Android Studio is installed
   - Set up Android SDK and emulator

## Running the App

### Android

```bash
npm run android
# or
yarn android
```

### iOS

```bash
npm run ios
# or
yarn ios
```

### Metro Bundler

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── data/
│   └── mockData.json          # Sample event and user data
├── navigation/
│   └── AppNavigator.tsx       # Navigation configuration
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx    # Login screen
│   │   └── SignUpScreen.tsx   # Sign up screen
│   ├── events/
│   │   ├── EventListScreen.tsx    # Event listing
│   │   └── EventDetailScreen.tsx  # Event details and registration
│   └── dashboard/
│       └── DashboardScreen.tsx    # User dashboard
├── services/
│   └── mockApiService.ts      # Mock API implementation
└── store/
    ├── api/
    │   └── apiSlice.ts        # RTK Query API definitions
    ├── slices/
    │   ├── authSlice.ts       # Authentication state
    │   └── eventSlice.ts      # Event state
    └── store.ts               # Redux store configuration
```

## Demo Credentials

For testing the app, you can use these demo credentials:

**Email**: john@example.com  
**Password**: password123

Or create a new account using the sign-up screen.

## App Features

### Authentication

- Secure login and registration
- Form validation
- Error handling for invalid credentials
- Persistent authentication state

### Event Management

- Browse events with images, dates, and pricing
- View detailed event information including:
  - Event name, date, and time
  - Location and description
  - Speaker information
  - Pricing and availability
  - Registration capacity
- Real-time availability tracking
- Event registration with immediate feedback

### User Dashboard

- View all registered events
- Quick access to event details
- Logout functionality
- Clean, intuitive interface

## Mock API

The app uses a mock API service that simulates real backend functionality:

- **Data Source**: JSON file with sample events, users, and registrations
- **Simulated Delays**: Network delays for realistic user experience
- **Error Handling**: Proper error responses for various scenarios
- **State Persistence**: In-memory data persistence during app session

## Customization

### Adding Real API

To connect to a real API, update the `apiSlice.ts` file:

1. Replace `fakeBaseQuery()` with `fetchBaseQuery({ baseUrl: 'YOUR_API_URL' })`
2. Update the endpoint configurations to use `query` instead of `queryFn`
3. Remove the mock service imports

### Styling

The app uses a clean, modern design with:

- Consistent color scheme (#007AFF primary, #28a745 success)
- Card-based layouts for better readability
- Responsive design for various screen sizes
- Material Design icons

## Error Handling

The app includes comprehensive error handling:

- Network request failures
- Authentication errors
- Registration conflicts
- Empty states and loading indicators
- User-friendly error messages

## Future Enhancements

- Push notifications for event reminders
- Event search and filtering
- User profile management
- Event reviews and ratings
- Social sharing features
- Calendar integration
- Offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
