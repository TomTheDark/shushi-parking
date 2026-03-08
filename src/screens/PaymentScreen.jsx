import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react'

const METHODS = [
  { id: 'visa', icon: CreditCard, label: 'Visa', sub: '**** **** **** 4242', color: '#1a6ede' },
  { id: 'mastercard', icon: CreditCard, label: 'Mastercard', sub: '**** **** **** 5555', color: '#eb001b' },
  { id: 'apple', icon: Smartphone, label: 'Apple Pay', sub: 'Touch ID', color: '#ffffff' },
  { id: 'google', icon: Smartphone, label: 'Google Pay', sub: 'Face Unlock', color: '#4CAF50' },
  { id: 'cash', icon: Banknote, label: 'Cash', sub: 'Pay on exit', color: '#4CAF50' },
]

export default function PaymentScreen() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('visa')

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">Payment</h1>
      </div>

      {/* Booking summary */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
        <h2 className="text-white font-semibold mb-3">Booking Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">Parking</span>
            <span className="text-white">Parking Cornavin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">Duration</span>
            <span className="text-white">2 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">Rate</span>
            <span className="text-white">CHF 3.50/h</span>
          </div>
          <div className="border-t border-[#2a2a2a] pt-2 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#FF6B00] font-bold text-lg">CHF 7.00</span>
          </div>
        </div>
      </div>

      <p className="text-[#8B8B8B] text-sm mb-4">Select payment method</p>

      <div className="space-y-2 mb-8">
        {METHODS.map(m => {
          const Icon = m.icon
          const isSelected = selected === m.id
          return (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                isSelected ? 'bg-[#FF6B00]/10 border-[#FF6B00]' : 'bg-[#1a1a1a] border-[#2a2a2a]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#242424] flex items-center justify-center">
                  <Icon size={18} style={{ color: m.color }} />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">{m.label}</p>
                  <p className="text-[#8B8B8B] text-xs">{m.sub}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-[#2a2a2a]'
              }`}>
                {isSelected && <Check size={10} className="text-white" />}
              </div>
            </button>
          )
        })}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-6">
        <p className="text-yellow-400 text-xs text-center">⚠️ Placeholder only — no real payment processing</p>
      </div>

      <button onClick={() => navigate('/ticket')} className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold">
        Continue — CHF 7.00
      </button>
    </div>
  )
}
