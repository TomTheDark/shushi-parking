import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'

const SPOTS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  label: `A-${String(i + 1).padStart(3, '0')}`,
  status: i < 6 ? 'occupied' : i === 12 ? 'selected_default' : 'available',
}))

const HISTORY = [
  { id: 'BK-001', parking: 'Parking Cornavin', date: '2024-01-15', duration: '2h', cost: 'CHF 7.00' },
  { id: 'BK-002', parking: 'Parking Rive', date: '2024-01-12', duration: '3h', cost: 'CHF 9.00' },
]

export default function ParkingAreaScreen() {
  const navigate = useNavigate()
  const [selectedSpot, setSelectedSpot] = useState(12)
  const [plate, setPlate] = useState('GE 123 456')

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">Book your Parking</h1>
      </div>

      <p className="text-[#8B8B8B] text-sm mb-4">Select an available spot</p>

      {/* Spot grid */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <div className="flex gap-4 text-xs mb-3 text-white">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500/60 inline-block" />Available</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/60 inline-block" />Occupied</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FF6B00] inline-block" />Selected</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {SPOTS.map(spot => {
            const isOccupied = spot.status === 'occupied'
            const isSelected = selectedSpot === spot.id
            return (
              <button
                key={spot.id}
                onClick={() => !isOccupied && setSelectedSpot(spot.id)}
                disabled={isOccupied}
                className={`aspect-square rounded-lg text-[8px] font-bold flex items-center justify-center transition-all ${
                  isSelected ? 'bg-[#FF6B00] text-white' :
                  isOccupied ? 'bg-red-500/30 text-red-400 cursor-not-allowed' :
                  'bg-green-500/20 text-green-400'
                }`}
              >
                {spot.label.split('-')[1]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected spot info */}
      <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-2xl p-4 mb-4">
        <p className="text-[#8B8B8B] text-xs">Selected Spot</p>
        <p className="text-[#FF6B00] text-2xl font-bold">{SPOTS[selectedSpot]?.label || '—'}</p>
      </div>

      {/* Plate */}
      <div className="mb-4">
        <label className="text-[#8B8B8B] text-xs mb-2 block">Plate Number</label>
        <input
          value={plate}
          onChange={e => setPlate(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3 text-white text-center tracking-widest font-semibold focus:outline-none focus:border-[#FF6B00]"
        />
      </div>

      {/* History */}
      <div className="mb-6">
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Clock size={16} className="text-[#FF6B00]" /> Past Bookings
        </h2>
        {HISTORY.map(h => (
          <div key={h.id} className="bg-[#1a1a1a] rounded-xl p-3 mb-2 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">{h.parking}</p>
              <p className="text-[#8B8B8B] text-xs">{h.date} · {h.duration}</p>
            </div>
            <span className="text-[#FF6B00] font-bold text-sm">{h.cost}</span>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/booking/1')} className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold">
        Start Booking
      </button>
    </div>
  )
}
