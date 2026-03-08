import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Car, ChevronDown, Plus, Minus } from 'lucide-react'
import { mockParkings, mockUser } from '../data/mockData'

export default function BookingScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const parking = mockParkings.find(p => p.id === parseInt(id)) || mockParkings[0]
  const [hours, setHours] = useState(2)
  const [plate, setPlate] = useState(mockUser.car.plate)

  const total = (parking.pricePerHour * hours).toFixed(2)
  const mins = hours * 60
  const display = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <h1 className="text-white text-lg font-bold">Book Parking</h1>
          <p className="text-[#8B8B8B] text-xs">{parking.name}</p>
        </div>
      </div>

      {/* Car selector */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center">
            <Car size={20} className="text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-white font-semibold">{mockUser.car.model}</p>
            <p className="text-[#8B8B8B] text-xs">{mockUser.car.type}</p>
          </div>
        </div>
        <ChevronDown size={16} className="text-[#8B8B8B]" />
      </div>

      {/* Plate input */}
      <div className="mb-4">
        <label className="text-[#8B8B8B] text-xs font-medium mb-2 block">Plate Number</label>
        <input
          value={plate}
          onChange={e => setPlate(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3.5 text-white font-semibold text-center tracking-widest text-lg focus:outline-none focus:border-[#FF6B00]"
          placeholder="GE 123 456"
        />
      </div>

      {/* Timer display */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-4 text-center">
        <p className="text-[#8B8B8B] text-xs mb-2">Duration</p>
        <div className="text-6xl font-bold text-white tracking-wider mb-2">{display}</div>
        <p className="text-[#8B8B8B] text-xs">HH : MM</p>
      </div>

      {/* Hours selector */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Parking Duration</p>
            <p className="text-[#8B8B8B] text-xs">{hours} {hours === 1 ? 'hour' : 'hours'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHours(h => Math.max(1, h - 1))}
              className="w-9 h-9 rounded-full bg-[#242424] flex items-center justify-center"
            >
              <Minus size={16} className="text-white" />
            </button>
            <span className="text-white font-bold w-6 text-center">{hours}</span>
            <button
              onClick={() => setHours(h => Math.min(24, h + 1))}
              className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-3">Price Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#8B8B8B] text-sm">Rate</span>
            <span className="text-white text-sm">CHF {parking.pricePerHour}/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B] text-sm">Duration</span>
            <span className="text-white text-sm">{hours}h</span>
          </div>
          <div className="border-t border-[#2a2a2a] pt-2 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#FF6B00] font-bold text-lg">CHF {total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/active-booking')}
        className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold text-lg"
      >
        Start Booking
      </button>
    </div>
  )
}
