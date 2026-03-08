import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, Clock, Car, Zap, Shield, Camera, Navigation } from 'lucide-react'
import { mockParkings } from '../data/mockData'

export default function ParkingDetailsScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const parking = mockParkings.find(p => p.id === parseInt(id)) || mockParkings[0]

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] pb-6">
      {/* Hero */}
      <div className="relative h-56 bg-gradient-to-br from-[#1a1a1a] via-[#242424] to-[#0a0a0a] flex items-end">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Car size={120} className="text-white" />
        </div>
        <div className="absolute top-12 left-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft size={18} className="text-white" />
          </button>
        </div>
        <div className="px-5 pb-4 w-full">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold">{parking.name}</h1>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-[#8B8B8B]" />
                <p className="text-[#8B8B8B] text-xs">{parking.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#FF6B00]/20 px-2 py-1 rounded-lg">
              <Star size={12} className="text-[#FF6B00] fill-[#FF6B00]" />
              <span className="text-[#FF6B00] text-sm font-bold">{parking.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Info grid */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: Car, label: 'Price', value: `CHF ${parking.pricePerHour}`, sub: '/h' },
            { icon: Clock, label: 'Hours', value: parking.hours, sub: '' },
            { icon: MapPin, label: 'Spots', value: parking.availableSpots, sub: '' },
            { icon: Zap, label: 'EV', value: parking.evChargers, sub: '' },
          ].map(item => (
            <div key={item.label} className="bg-[#1a1a1a] rounded-2xl p-3 text-center">
              <p className="text-white text-sm font-bold">{item.value}<span className="text-[#8B8B8B] text-[10px]">{item.sub}</span></p>
              <p className="text-[#8B8B8B] text-[10px] mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-5">
          <h2 className="text-white font-semibold mb-3">Features</h2>
          <div className="flex flex-wrap gap-2">
            {parking.features.map(f => (
              <span key={f} className="flex items-center gap-1.5 bg-[#1a1a1a] text-[#8B8B8B] text-xs px-3 py-1.5 rounded-full">
                {f === 'EV Charging' && <Zap size={10} className="text-green-400" />}
                {f === '24h Security' && <Shield size={10} className="text-[#FF6B00]" />}
                {f === 'CCTV' && <Camera size={10} className="text-blue-400" />}
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Spot sizes */}
        <div className="mb-5">
          <h2 className="text-white font-semibold mb-3">Spot Sizes</h2>
          <div className="flex gap-2">
            {parking.spotSizes.map(s => (
              <span key={s} className="bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs px-3 py-1.5 rounded-full capitalize">{s}</span>
            ))}
          </div>
        </div>

        {/* Spot types */}
        <div className="mb-5">
          <h2 className="text-white font-semibold mb-3">Parking Zones</h2>
          <div className="flex gap-2">
            {parking.spotTypes.map(t => (
              <span key={t} className={`text-xs px-3 py-1.5 rounded-full capitalize font-medium ${
                t === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white'
              }`}>{t} zone</span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h2 className="text-white font-semibold mb-3">Reviews</h2>
          {parking.reviews.map(r => (
            <div key={r.id} className="bg-[#1a1a1a] rounded-2xl p-4 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{r.user}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < r.rating ? 'text-[#FF6B00] fill-[#FF6B00]' : 'text-[#2a2a2a]'} />
                  ))}
                </div>
              </div>
              <p className="text-[#8B8B8B] text-xs leading-relaxed">{r.comment}</p>
              <p className="text-[#4a4a4a] text-[10px] mt-2">{r.date}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${parking.lat},${parking.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 rounded-2xl border border-[#FF6B00] text-[#FF6B00] font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Navigation size={16} />
            Navigate
          </a>
          <button
            onClick={() => navigate(`/booking/${parking.id}`)}
            className="flex-1 py-4 rounded-2xl bg-[#FF6B00] text-white font-semibold text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
