import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, MapPin, Navigation, Clock } from 'lucide-react'
import { mockParkings } from '../data/mockData'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createIcon(color, label) {
  const svg = `<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="${color}"/>
    <circle cx="16" cy="16" r="8" fill="white"/>
    <text x="16" y="21" text-anchor="middle" fill="${color}" font-size="10" font-weight="bold" font-family="system-ui">${label}</text>
  </svg>`
  return L.divIcon({ html: svg, iconSize: [32, 40], iconAnchor: [16, 40], className: '' })
}

export default function TrackingScreen() {
  const navigate = useNavigate()
  const parking = mockParkings[0]
  const userPos = [46.2100, 6.1380]
  const parkingPos = [parking.lat, parking.lng]

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl px-4 py-2.5">
          <p className="text-white text-sm font-medium">Track to Parking</p>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer center={[46.2090, 6.1400]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
          <Marker position={userPos} icon={createIcon('#4CAF50', 'Me')} />
          <Marker position={parkingPos} icon={createIcon('#FF6B00', 'P')} />
          <Polyline positions={[userPos, parkingPos]} color="#FF6B00" weight={3} dashArray="8,4" opacity={0.8} />
        </MapContainer>
      </div>

      {/* Bottom card */}
      <div className="bg-[#1a1a1a] rounded-t-3xl p-5 pb-8 z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-[#242424] rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Navigation size={12} className="text-[#FF6B00]" />
              <span className="text-[#8B8B8B] text-xs">Distance</span>
            </div>
            <p className="text-white font-bold">0.3 km</p>
          </div>
          <div className="flex-1 bg-[#242424] rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={12} className="text-[#FF6B00]" />
              <span className="text-[#8B8B8B] text-xs">Walking</span>
            </div>
            <p className="text-white font-bold">~4 min</p>
          </div>
        </div>

        <div className="bg-[#242424] rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center">
            <MapPin size={20} className="text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-white font-semibold">{parking.name}</p>
            <p className="text-[#8B8B8B] text-xs">{parking.address}</p>
          </div>
        </div>

        <button onClick={() => navigate(-1)} className="w-full py-3.5 rounded-2xl border border-[#FF6B00]/50 text-[#FF6B00] font-semibold">
          Track Stop
        </button>
      </div>
    </div>
  )
}
