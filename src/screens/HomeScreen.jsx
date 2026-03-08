import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Bell, Car, Bike, Bus, ChevronRight, Navigation, Zap } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mockParkings, mockNotifications } from '../data/mockData'
import BottomNav from '../components/BottomNav'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createParkingIcon(parking) {
  const color = parking.availableSpots === 0 ? '#F44336' : parking.availableSpots < 20 ? '#FF6B00' : '#4CAF50'
  const svg = `<svg width="36" height="44" viewBox="0 0 36 44" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C8.06 0 0 8.06 0 18c0 12 18 26 18 26s18-14 18-26C36 8.06 27.94 0 18 0z" fill="${color}"/>
    <circle cx="18" cy="18" r="12" fill="rgba(0,0,0,0.3)"/>
    <text x="18" y="23" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="system-ui">${parking.availableSpots}</text>
  </svg>`
  return L.divIcon({
    html: svg,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
    className: ''
  })
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('car')
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-[#0a0a0a] z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#8B8B8B] text-sm">Good morning 👋</p>
            <h1 className="text-xl font-bold text-white">Hello, User</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-full px-3 py-1.5">
              <MapPin size={12} className="text-[#FF6B00]" />
              <span className="text-xs text-white font-medium">Geneva</span>
            </div>
            <button onClick={() => setShowNotifications(true)} className="relative w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <Bell size={18} className="text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6B00]" />
              )}
            </button>
          </div>
        </div>
        
        {/* Transport tabs */}
        <div className="flex gap-2">
          {[
            { key: 'car', icon: Car, label: 'Car' },
            { key: 'bike', icon: Bike, label: 'Bike' },
            { key: 'bus', icon: Bus, label: 'Bus' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-[#1a1a1a] text-[#8B8B8B]'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: 0 }}>
        <MapContainer
          center={[46.2044, 6.1432]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          {mockParkings.map(parking => (
            <Marker key={parking.id} position={[parking.lat, parking.lng]} icon={createParkingIcon(parking)}>
              <Popup>
                <div style={{ background: '#1a1a1a', color: 'white', padding: '8px', borderRadius: '8px', minWidth: '150px' }}>
                  <strong>{parking.name}</strong>
                  <p style={{ color: '#8B8B8B', fontSize: '12px' }}>{parking.availableSpots} spots • CHF {parking.pricePerHour}/h</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom sheet */}
      <div className="bg-[#1a1a1a] rounded-t-3xl px-5 pt-4 pb-24 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Nearby Parkings</h2>
          <button onClick={() => navigate('/parking-map')} className="text-[#FF6B00] text-sm font-medium flex items-center gap-1">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {mockParkings.slice(0, 4).map(parking => (
            <div
              key={parking.id}
              onClick={() => navigate(`/parking/${parking.id}`)}
              className="flex-shrink-0 w-48 bg-[#242424] rounded-2xl p-3 cursor-pointer active:opacity-80"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  parking.availableSpots === 0 ? 'bg-red-500/20 text-red-400' :
                  parking.availableSpots < 20 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {parking.availableSpots === 0 ? 'Full' : `${parking.availableSpots} left`}
                </span>
                {parking.evChargers > 0 && <Zap size={14} className="text-[#FF6B00]" />}
              </div>
              <h3 className="text-white text-sm font-semibold mb-1 truncate">{parking.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Navigation size={10} className="text-[#8B8B8B]" />
                <span className="text-[#8B8B8B] text-xs">{parking.distance}</span>
              </div>
              <p className="text-[#FF6B00] font-bold text-sm">CHF {parking.pricePerHour}/h</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end" onClick={() => setShowNotifications(false)}>
          <div className="bg-[#1a1a1a] rounded-t-3xl p-5 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Notifications</h2>
              <button onClick={() => setShowNotifications(false)} className="text-[#8B8B8B] text-sm">Close</button>
            </div>
            {mockNotifications.map(notif => (
              <div key={notif.id} className={`p-3 rounded-xl mb-2 ${notif.read ? 'bg-[#242424]' : 'bg-[#FF6B00]/10 border border-[#FF6B00]/20'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">{notif.title}</p>
                    <p className="text-[#8B8B8B] text-xs mt-1">{notif.message}</p>
                  </div>
                  <span className="text-[#8B8B8B] text-xs whitespace-nowrap ml-2">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
