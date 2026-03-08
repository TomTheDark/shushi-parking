import { Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import ParkingMapScreen from './screens/ParkingMapScreen'
import ParkingDetailsScreen from './screens/ParkingDetailsScreen'
import BookingScreen from './screens/BookingScreen'
import ActiveBookingScreen from './screens/ActiveBookingScreen'
import TrackingScreen from './screens/TrackingScreen'
import ChargingScreen from './screens/ChargingScreen'
import ChargingPortsScreen from './screens/ChargingPortsScreen'
import ParkingAreaScreen from './screens/ParkingAreaScreen'
import PaymentScreen from './screens/PaymentScreen'
import TicketScreen from './screens/TicketScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/parking-map" element={<ParkingMapScreen />} />
      <Route path="/parking/:id" element={<ParkingDetailsScreen />} />
      <Route path="/booking/:id" element={<BookingScreen />} />
      <Route path="/active-booking" element={<ActiveBookingScreen />} />
      <Route path="/tracking" element={<TrackingScreen />} />
      <Route path="/charging" element={<ChargingScreen />} />
      <Route path="/charging-ports" element={<ChargingPortsScreen />} />
      <Route path="/parking-area" element={<ParkingAreaScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/ticket" element={<TicketScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
