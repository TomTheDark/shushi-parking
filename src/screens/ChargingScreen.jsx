import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, ChevronRight } from 'lucide-react'

export default function ChargingScreen() {
  const navigate = useNavigate()
  const currentCharge = 32
  const [target, setTarget] = useState(80)
  const [animated, setAnimated] = useState(currentCharge)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(target), 100)
    return () => clearTimeout(t)
  }, [target])

  const r = 80
  const circ = 2 * Math.PI * r
  const dash = circ * (animated / 100)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">EV Charging</h1>
      </div>

      <p className="text-[#8B8B8B] text-sm mb-8">How much energy do you need?</p>

      {/* Circular progress */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="#1a1a1a" strokeWidth="12" />
            <circle
              cx="100" cy="100" r={r} fill="none"
              stroke="#FF6B00" strokeWidth="12"
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
            <circle
              cx="100" cy="100" r={r} fill="none"
              stroke="#4CAF50" strokeWidth="12"
              strokeDasharray={`${circ * (currentCharge / 100)} ${circ}`}
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Zap size={24} className="text-[#FF6B00] mb-1" />
            <span className="text-white text-4xl font-bold">{target}%</span>
            <span className="text-[#8B8B8B] text-xs">Target</span>
          </div>
        </div>
      </div>

      {/* Current vs target */}
      <div className="flex justify-between mb-6 bg-[#1a1a1a] rounded-2xl p-4">
        <div className="text-center">
          <p className="text-[#8B8B8B] text-xs mb-1">Current</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white font-bold">{currentCharge}%</span>
          </div>
        </div>
        <div className="w-px bg-[#2a2a2a]" />
        <div className="text-center">
          <p className="text-[#8B8B8B] text-xs mb-1">Target</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            <span className="text-white font-bold">{target}%</span>
          </div>
        </div>
        <div className="w-px bg-[#2a2a2a]" />
        <div className="text-center">
          <p className="text-[#8B8B8B] text-xs mb-1">To add</p>
          <span className="text-white font-bold">{target - currentCharge}%</span>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <label className="text-[#8B8B8B] text-xs mb-3 block">Adjust Target ({target}%)</label>
        <input
          type="range" min={currentCharge + 1} max={100} value={target}
          onChange={e => setTarget(Number(e.target.value))}
          className="w-full accent-[#FF6B00]"
        />
        <div className="flex justify-between text-[#8B8B8B] text-xs mt-1">
          <span>{currentCharge}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Estimated cost */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#8B8B8B] text-xs">Estimated Cost</p>
            <p className="text-white font-bold">CHF {(((target - currentCharge) / 100) * 50 * 0.44).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[#8B8B8B] text-xs">Estimated Time</p>
            <p className="text-white font-bold">{Math.round((target - currentCharge) / 30)} hrs</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/charging-ports')}
        className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold flex items-center justify-center gap-2"
      >
        Continue <ChevronRight size={18} />
      </button>
    </div>
  )
}
