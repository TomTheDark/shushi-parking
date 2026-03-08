import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, Check } from 'lucide-react'

const PORTS = [
  { id: 1, name: 'CHADEMO', speed: 'DC Fast', power: '50 kW', price: 4.40, available: 2, total: 4 },
  { id: 2, name: 'Type 2', speed: 'AC Standard', power: '22 kW', price: 2.80, available: 3, total: 6 },
  { id: 3, name: 'Type 2 — CCS', speed: 'DC Fast', power: '100 kW', price: 5.20, available: 1, total: 2 },
  { id: 4, name: 'Tesla Supercharger', speed: 'DC Ultra', power: '250 kW', price: 6.00, available: 0, total: 4 },
]

export default function ChargingPortsScreen() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">Select Charging Port</h1>
      </div>

      <div className="space-y-3 mb-8">
        {PORTS.map(port => {
          const isSelected = selected === port.id
          const isAvailable = port.available > 0
          return (
            <button
              key={port.id}
              onClick={() => isAvailable && setSelected(port.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                isSelected ? 'bg-[#FF6B00]/10 border-[#FF6B00]' :
                !isAvailable ? 'bg-[#1a1a1a] border-[#2a2a2a] opacity-50' :
                'bg-[#1a1a1a] border-[#2a2a2a]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#FF6B00]' : 'bg-[#242424]'
                  }`}>
                    <Zap size={18} className={isSelected ? 'text-white' : 'text-[#FF6B00]'} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{port.name}</p>
                    <p className="text-[#8B8B8B] text-xs">{port.speed} • {port.power}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#FF6B00] font-bold">CHF {port.price.toFixed(2)}<span className="text-[#8B8B8B] text-xs font-normal">/kWh</span></p>
                  <p className={`text-xs ${isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                    {isAvailable ? `${port.available}/${port.total} available` : 'Not available'}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="flex items-center gap-1 mt-3 text-[#FF6B00] text-xs">
                  <Check size={12} />
                  <span>Selected</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => selected && navigate('/payment')}
        disabled={!selected}
        className={`w-full py-4 rounded-2xl font-bold text-white ${selected ? 'bg-[#FF6B00]' : 'bg-[#2a2a2a] opacity-50'}`}
      >
        Confirm Port
      </button>
    </div>
  )
}
