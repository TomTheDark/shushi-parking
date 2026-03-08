import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Car, StopCircle } from 'lucide-react'
import { mockParkings, mockUser } from '../data/mockData'

export default function ActiveBookingScreen() {
  const navigate = useNavigate()
  const parking = mockParkings[0]
  const maxSeconds = 2 * 3600
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const iv = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(iv)
  }, [running])

  const remaining = maxSeconds - elapsed
  const hh = String(Math.floor(remaining / 3600)).padStart(2, '0')
  const mm = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const cost = ((elapsed / 3600) * parking.pricePerHour).toFixed(2)
  const progress = Math.min(elapsed / maxSeconds, 1)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="pt-12 pb-6">
        <h1 className="text-white text-xl font-bold">Active Parking</h1>
        <p className="text-[#8B8B8B] text-sm">Session in progress</p>
      </div>

      {/* Timer */}
      <div className="bg-[#1a1a1a] rounded-3xl p-8 mb-4 text-center">
        <p className="text-[#8B8B8B] text-xs mb-1">Time Remaining</p>
        <div className="text-5xl font-bold text-white tracking-widest mb-2">{hh}:{mm}:{ss}</div>
        <div className="w-full h-2 bg-[#242424] rounded-full overflow-hidden mt-4">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress * 100}%`,
              background: progress > 0.8 ? '#F44336' : progress > 0.6 ? '#FF6B00' : '#4CAF50'
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[#8B8B8B] text-xs">Started</span>
          <span className="text-[#8B8B8B] text-xs">2 hours max</span>
        </div>
      </div>

      {/* Live cost */}
      <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-2xl p-4 mb-4 text-center">
        <p className="text-[#8B8B8B] text-xs">Current Cost</p>
        <p className="text-[#FF6B00] text-3xl font-bold">CHF {cost}</p>
      </div>

      {/* Car & location info */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center">
          <Car size={20} className="text-[#FF6B00]" />
        </div>
        <div>
          <p className="text-white font-semibold">{mockUser.car.model}</p>
          <p className="text-[#8B8B8B] text-xs">{mockUser.car.plate}</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
          <MapPin size={20} className="text-[#FF6B00]" />
        </div>
        <div>
          <p className="text-white font-semibold">{parking.name}</p>
          <p className="text-[#8B8B8B] text-xs">{parking.address}</p>
        </div>
      </div>

      {/* Spot number */}
      <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center">
          <span className="text-[#FF6B00] font-bold text-sm">P</span>
        </div>
        <div>
          <p className="text-[#8B8B8B] text-xs">Your Spot</p>
          <p className="text-white font-bold text-lg">White Zone · A-013</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => setRunning(r => !r)}
          className="flex-1 py-4 rounded-2xl border border-red-500/50 text-red-400 font-semibold flex items-center justify-center gap-2"
        >
          <StopCircle size={18} />
          {running ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={() => navigate('/payment')}
          className="flex-1 py-4 rounded-2xl bg-[#FF6B00] text-white font-bold"
        >
          End Parking
        </button>
      </div>
    </div>
  )
}
