import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, Filter, X, Zap, MapPin } from 'lucide-react'
import { mockParkings } from '../data/mockData'
import BottomNav from '../components/BottomNav'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createParkingIcon(parking) {
  const color = parking.availableSpots === 0 ? '#F44336' : parking.availableSpots < 20 ? '#FF6B00' : '#4CAF50'
  const svg = `<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0C8.95 0 0 8.95 0 20c0 14 20 30 20 30s20-16 20-30C40 8.95 31.05 0 20 0z" fill="${color}"/>
    <circle cx="20" cy="20" r="14" fill="rgba(0,0,0,0.35)"/>
    <text x="20" y="26" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="system-ui">${parking.availableSpots}</text>
  </svg>`
  return L.divIcon({ html: svg, iconSize: [40, 50], iconAnchor: [20, 50], popupAnchor: [0, -50], className: '' })
}

const FILTERS = ['All', 'Available', 'EV Charging', 'Covered']

export default function ParkingMapScreen() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedParking, setSelectedParking] = useState(null)

  const filtered = mockParkings.filter(p => {
    if (activeFilter === 'Available') return p.availableSpots > 0
    if (activeFilter === 'EV Charging') return p.evChargers > 0
    if (activeFilter === 'Covered') return p.type === 'covered' || p.type === 'underground'
    return true
  })

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a]/90 flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1 bg-[#1a1a1a]/90 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
            <p className="text-white text-sm font-medium">Parking Map — Geneva</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#1a1a1a]/90 flex items-center justify-center backdrop-blur-sm">
            <Filter size={16} className="text-[#FF6B00]" />
          </button>
        </div>
        
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f ? 'bg-[#FF6B00] text-white' : 'bg-[#1a1a1a]/90 text-[#8B8B8B] backdrop-blur-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[46.2044, 6.1432]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
          {filtered.map(parking => (
            <Marker
              key={parking.id}
              position={[parking.lat, parking.lng]}
              icon={createParkingIcon(parking)}
              eventHandlers={{ click: () => setSelectedParking(parking) }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Selected parking bottom sheet */}
      {selectedParking ? (
        <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl p-5 z-20 pb-8">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold">{selectedParking.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#8B8B8B]" />
                <p className="text-[#8B8B8B] text-xs">{selectedParking.address}</p>
              </div>
            </div>
            <button onClick={() => setSelectedParking(null)} className="w-8 h-8 rounded-full bg-[#242424] flex items-center justify-center">
              <X size={14} className="text-[#8B8B8B]" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Price', value: `CHF ${selectedParking.pricePerHour}`, sub: '/hour' },
              { label: 'Hours', value: selectedParking.hours, sub: '' },
              { label: 'Spots', value: selectedParking.availableSpots, sub: 'avail.' },
              { label: 'Rating', value: selectedParking.rating, sub: '★' },
            ].map(item => (
              <div key={item.label} className="bg-[#242424] rounded-xl p-2 text-center">
                <p className="text-white text-sm font-bold">{item.value}<span className="text-[#8B8B8B] text-[10px]">{item.sub}</span></p>
                <p className="text-[#8B8B8B] text-[10px]">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 mb-3">
            {selectedParking.evChargers > 0 && (
              <span className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                <Zap size={10} /> EV Charging
              </span>
            )}
            <span className="bg-[#242424] text-[#8B8B8B] text-xs px-2 py-1 rounded-full capitalize">{selectedParking.type}</span>
            {selectedParking.spotTypes.map(t => (
              <span key={t} className="bg-[#242424] text-[#8B8B8B] text-xs px-2 py-1 rounded-full capitalize">{t} zone</span>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => navigate(`/parking/${selectedParking.id}`)} className="flex-1 py-3 rounded-xl border border-[#FF6B00] text-[#FF6B00] font-semibold text-sm">
              Details
            </button>
            <button onClick={() => navigate(`/booking/${selectedParking.id}`)} className="flex-1 py-3 rounded-xl bg-[#FF6B00] text-white font-semibold text-sm">
              Book Now
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-16 left-0 right-0 px-4 z-20">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-white">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />Available</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] inline-block" />Limited</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Full</span>
              </div>
              <span className="text-[#8B8B8B] text-xs">{filtered.length} spots</span>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
