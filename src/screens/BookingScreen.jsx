import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Car, ChevronDown, Plus, Minus, Clock, Calendar } from 'lucide-react'
import { mockParkings } from '../data/mockData'
import { useUser } from '../context/UserContext'

// Compute the earliest selectable date once at module load time to avoid
// re-creating a Date on every render and the edge-case of midnight roll-overs.
const TODAY_ISO = new Date().toISOString().split('T')[0]

function formatScheduled(dateStr, timeStr) {
  if (!dateStr || !timeStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hour, minute] = timeStr.split(':').map(Number)
  const d = new Date(year, month - 1, day, hour, minute)
  return d.toLocaleString(undefined, {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

function formatDurationLabel(hours, t) {
  const h = Math.floor(hours)
  const isHalf = hours % 1 !== 0
  if (h === 0) return `30 ${t('min')}`
  if (!isHalf) return `${h} ${h === 1 ? t('hour') : t('hours')}`
  return `${h}h 30${t('min')}`
}

function formatDurationShort(hours) {
  const h = Math.floor(hours)
  const isHalf = hours % 1 !== 0
  if (h === 0) return '30min'
  if (!isHalf) return `${h}h`
  return `${h}h 30min`
}

export default function BookingScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, t } = useUser()
  const parking = mockParkings.find(p => p.id === parseInt(id)) || mockParkings[0]
  const [hours, setHours] = useState(2)
  const defaultVehicle = user.vehicles.find(v => v.isDefault) || user.vehicles[0]
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicle?.id)
  const selectedVehicle = user.vehicles.find(v => v.id === selectedVehicleId) || defaultVehicle
  const [bookingMode, setBookingMode] = useState('now') // 'now' | 'advance'

  // Advance booking defaults: tomorrow at the current hour
  const [bookingDate, setBookingDate] = useState(() => {
    const t = new Date()
    t.setDate(t.getDate() + 1)
    return t.toISOString().split('T')[0]
  })
  const [bookingTime, setBookingTime] = useState(() => {
    const t = new Date()
    return `${String(t.getHours()).padStart(2, '0')}:00`
  })

  const total = (parking.pricePerHour * hours).toFixed(2)
  const totalMins = Math.round(hours * 60)
  const display = `${String(Math.floor(totalMins / 60)).padStart(2, '0')}:${String(totalMins % 60).padStart(2, '0')}`
  const scheduledLabel = useMemo(() => formatScheduled(bookingDate, bookingTime), [bookingDate, bookingTime])

  const handleConfirm = () => {
    const bookingData = {
      parking,
      hours,
      selectedVehicle,
      bookingMode,
      bookingDate,
      bookingTime,
      total,
    }
    if (bookingMode === 'advance') {
      navigate('/ticket', { state: { booking: buildAdvanceBooking(bookingData), isScheduled: true } })
    } else {
      navigate('/active-booking', { state: bookingData })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <h1 className="text-white text-lg font-bold">{t('bookParking')}</h1>
          <p className="text-[#8B8B8B] text-xs">{parking.name}</p>
        </div>
      </div>

      {/* Booking mode toggle */}
      <div className="bg-[#1a1a1a] rounded-2xl p-1 mb-4 flex">
        <button
          onClick={() => setBookingMode('now')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            bookingMode === 'now' ? 'bg-[#FF6B00] text-white' : 'text-[#8B8B8B]'
          }`}
        >
          <Clock size={14} /> {t('now')}
        </button>
        <button
          onClick={() => setBookingMode('advance')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            bookingMode === 'advance' ? 'bg-[#FF6B00] text-white' : 'text-[#8B8B8B]'
          }`}
        >
          <Calendar size={14} /> {t('inAdvance')}
        </button>
      </div>

      {/* Date / time picker for advance booking */}
      {bookingMode === 'advance' && (
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
          <p className="text-[#8B8B8B] text-xs font-medium mb-3">{t('scheduleParkingLabel')}</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[#8B8B8B] text-xs mb-1 block">{t('date')}</label>
              <input
                type="date"
                value={bookingDate}
                min={TODAY_ISO}
                onChange={e => setBookingDate(e.target.value)}
                className="w-full bg-[#242424] border border-[#3a3a3a] rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF6B00] [color-scheme:dark]"
              />
            </div>
            <div className="flex-1">
              <label className="text-[#8B8B8B] text-xs mb-1 block">{t('time')}</label>
              <input
                type="time"
                value={bookingTime}
                onChange={e => setBookingTime(e.target.value)}
                className="w-full bg-[#242424] border border-[#3a3a3a] rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF6B00] [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Car selector */}
      {user.vehicles.length > 1 ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
          <div className="space-y-2">
            {user.vehicles.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  v.id === selectedVehicleId
                    ? 'border-[#FF6B00] bg-[#FF6B00]/10'
                    : 'border-[#2a2a2a] bg-[#242424]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/20 flex items-center justify-center">
                  <Car size={16} className="text-[#FF6B00]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-semibold">{v.model}</p>
                  <p className="text-[#8B8B8B] text-xs">{v.plate}</p>
                </div>
                {v.id === selectedVehicleId && (
                  <div className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center">
              <Car size={20} className="text-[#FF6B00]" />
            </div>
            <div>
              <p className="text-white font-semibold">{selectedVehicle?.model}</p>
              <p className="text-[#8B8B8B] text-xs">{selectedVehicle?.type}</p>
            </div>
          </div>
          <ChevronDown size={16} className="text-[#8B8B8B]" />
        </div>
      )}

      {/* Timer display */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-4 text-center">
        <p className="text-[#8B8B8B] text-xs mb-2">{t('duration')}</p>
        <div className="text-6xl font-bold text-white tracking-wider mb-2">{display}</div>
        <p className="text-[#8B8B8B] text-xs">HH : MM</p>
      </div>

      {/* Duration selector with half-hour steps */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{t('parkingDuration')}</p>
            <p className="text-[#8B8B8B] text-xs">{formatDurationLabel(hours, t)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHours(h => Math.max(0.5, Math.round((h - 0.5) * 2) / 2))}
              className="w-9 h-9 rounded-full bg-[#242424] flex items-center justify-center"
            >
              <Minus size={16} className="text-white" />
            </button>
            <span className="text-white font-bold w-12 text-center text-sm">{formatDurationShort(hours)}</span>
            <button
              onClick={() => setHours(h => Math.min(24, Math.round((h + 0.5) * 2) / 2))}
              className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-3">{t('priceSummary')}</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#8B8B8B] text-sm">{t('rate')}</span>
            <span className="text-white text-sm">CHF {parking.pricePerHour}/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B8B8B] text-sm">{t('duration')}</span>
            <span className="text-white text-sm">{formatDurationShort(hours)}</span>
          </div>
          {bookingMode === 'advance' && (
            <div className="flex justify-between">
              <span className="text-[#8B8B8B] text-sm">{t('scheduledFor')}</span>
              <span className="text-white text-sm text-right flex-1 ml-4">{scheduledLabel}</span>
            </div>
          )}
          <div className="border-t border-[#2a2a2a] pt-2 flex justify-between">
            <span className="text-white font-semibold">{t('totalPaid')}</span>
            <span className="text-[#FF6B00] font-bold text-lg">CHF {total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold text-lg"
      >
        {bookingMode === 'advance' ? t('scheduleBooking') : t('startBooking')}
      </button>
    </div>
  )
}

function buildAdvanceBooking({ parking, hours, selectedVehicle, bookingDate, bookingTime, total }) {
  const [year, month, day] = (bookingDate || '').split('-').map(Number)
  const [hour, min] = (bookingTime || '00:00').split(':').map(Number)
  const d = new Date(year, month - 1, day, hour, min)
  const dateLabel = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  const timeLabel = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
  const endHour = hour + Math.floor(hours)
  const endMin = min + Math.round((hours % 1) * 60)
  const endLabel = `${String(endHour % 24).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`

  return {
    id: `BK-${new Date().getFullYear()}-ADV`,
    parkingName: parking.name,
    address: parking.address,
    zone: `${parking.zone ?? 'White Zone'} · A-001`,
    date: dateLabel,
    time: timeLabel,
    endTime: endLabel,
    duration: hours,
    vehicle: selectedVehicle ? `${selectedVehicle.model} · ${selectedVehicle.plate}` : '',
    pricePerHour: parking.pricePerHour,
    total: parseFloat(total),
    status: 'upcoming',
    isScheduled: true,
  }
}

