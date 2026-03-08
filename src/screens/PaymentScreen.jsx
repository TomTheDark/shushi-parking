import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react'
import { useUser } from '../context/UserContext'

const METHODS = [
  { id: 'visa', icon: CreditCard, label: 'Visa', sub: '**** **** **** 4242', color: '#1a6ede' },
  { id: 'mastercard', icon: CreditCard, label: 'Mastercard', sub: '**** **** **** 5555', color: '#eb001b' },
  { id: 'apple', icon: Smartphone, label: 'Apple Pay', sub: 'Touch ID', color: '#ffffff' },
  { id: 'google', icon: Smartphone, label: 'Google Pay', sub: 'Face Unlock', color: '#4CAF50' },
  { id: 'cash', icon: Banknote, label: 'Cash', sub: 'Pay on exit', color: '#4CAF50' },
]

function formatDuration(hours) {
  const h = Math.floor(hours)
  const isHalf = hours % 1 !== 0
  if (h === 0) return '30min'
  if (!isHalf) return `${h}h`
  return `${h}h 30min`
}

function addHoursToTime(timeStr, hours) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const totalMins = h * 60 + m + Math.round(hours * 60)
  const endH = Math.floor(totalMins / 60) % 24
  const endM = totalMins % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

export default function PaymentScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useUser()
  const [selected, setSelected] = useState('visa')

  const state = location.state || {}
  const parking = state.parking
  const hours = state.hours ?? 2
  const selectedVehicle = state.selectedVehicle
  const actualElapsed = state.actualElapsed ?? (hours * 3600)
  const actualCost = state.actualCost ?? (parking ? (actualElapsed / 3600) * parking.pricePerHour : 7.0)

  const now = new Date()
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const endTime = addHoursToTime(timeStr, hours)

  const handlePay = () => {
    const booking = {
      id: `BK-${now.getFullYear()}-NEW`,
      parkingName: parking?.name || 'Parking',
      address: parking?.address || '',
      zone: 'White Zone · A-013',
      date: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      time: timeStr,
      endTime,
      duration: hours,
      vehicle: selectedVehicle ? `${selectedVehicle.model} · ${selectedVehicle.plate}` : '',
      pricePerHour: parking?.pricePerHour ?? 3.5,
      total: parseFloat(actualCost.toFixed(2)),
      status: 'completed',
    }
    navigate('/ticket', { state: { booking } })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">{t('payment')}</h1>
      </div>

      {/* Booking summary */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
        <h2 className="text-white font-semibold mb-3">{t('bookingSummary')}</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">{t('parking')}</span>
            <span className="text-white">{parking?.name || 'Parking Cornavin'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">{t('duration')}</span>
            <span className="text-white">{formatDuration(hours)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B]">{t('rate')}</span>
            <span className="text-white">CHF {parking?.pricePerHour ?? 3.5}/h</span>
          </div>
          <div className="border-t border-[#2a2a2a] pt-2 flex justify-between">
            <span className="text-white font-semibold">{t('totalPaid')}</span>
            <span className="text-[#FF6B00] font-bold text-lg">CHF {actualCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-[#8B8B8B] text-sm mb-4">{t('selectPaymentMethod')}</p>

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
        <p className="text-yellow-400 text-xs text-center">{t('placeholderWarning')}</p>
      </div>

      <button onClick={handlePay} className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold">
        {t('continue')} — CHF {actualCost.toFixed(2)}
      </button>
    </div>
  )
}

