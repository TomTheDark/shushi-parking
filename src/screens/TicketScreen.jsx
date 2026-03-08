import { useNavigate, useLocation } from 'react-router-dom'
import { Check, Download, Share2, MapPin, Clock, Car, ArrowLeft, Calendar } from 'lucide-react'
import { useUser } from '../context/UserContext'

const QR_PATTERN = [1,0,1,1,0,1,0,1,1,0,0,1,1,1,0,1]

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

export default function TicketScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useUser()

  const booking = location.state?.booking
  const isScheduled = location.state?.isScheduled || booking?.isScheduled || false

  const bookingId = booking?.id || 'BK-NEW'
  const parkingName = booking?.parkingName || 'Parking Cornavin'
  const zone = booking?.zone || 'White Zone · A-013'
  const dateTime = booking ? `${booking.date} · ${booking.time}` : 'Jan 15, 2024 · 14:00'
  const duration = booking?.duration ?? 2
  const computedEndTime = addHoursToTime(booking?.time, duration)
  const endTime = booking?.endTime || computedEndTime || '--:--'
  const vehicle = booking?.vehicle || 'SL 250 ML · GE 123 456'
  const pricePerHour = booking?.pricePerHour ?? 3.5
  const total = booking?.total ?? 7.0

  const durationLabel = endTime !== '--:--'
    ? `${formatDuration(duration)} (${t('until')} ${endTime})`
    : formatDuration(duration)

  // ~5 minutes after start for payment processing
  const paymentTime = addHoursToTime(booking?.time, 5 / 60) || '--:--'

  const activityItems = isScheduled
    ? [{ time: booking?.time || '--:--', event: t('scheduledArrival'), color: 'blue' }]
    : [
        { time: booking?.time || '--:--', event: t('entryRecorded'), color: 'green' },
        { time: paymentTime, event: t('paymentProcessed'), color: 'blue' },
        { time: endTime, event: t('exitTime'), color: 'orange' },
      ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-1">
            {isScheduled
              ? <Calendar size={22} className="text-green-400" />
              : <Check size={22} className="text-green-400" />
            }
          </div>
          <h1 className="text-white text-xl font-bold">
            {isScheduled ? t('bookingScheduled') : t('bookingConfirmed')}
          </h1>
          <p className="text-[#8B8B8B] text-sm mt-1">
            {isScheduled ? t('yourScheduledBooking') : t('yourParkingTicket')}
          </p>
        </div>
        <div className="w-10" />
      </div>

      {/* Ticket card */}
      <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden mb-4">
        {/* Top */}
        <div className="bg-[#FF6B00] p-5">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">{t('bookingId')}</p>
              <p className="text-2xl font-bold tracking-wider">#{bookingId}</p>
            </div>
            {/* QR placeholder */}
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-4 gap-0.5">
                {QR_PATTERN.map((v, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-sm ${v ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashed separator */}
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-[#0a0a0a] -ml-2.5" />
          <div className="flex-1 border-t-2 border-dashed border-[#2a2a2a] mx-2" />
          <div className="w-5 h-5 rounded-full bg-[#0a0a0a] -mr-2.5" />
        </div>

        {/* Details */}
        <div className="p-5 space-y-3">
          {[
            { icon: MapPin, label: t('location'), value: parkingName },
            { icon: MapPin, label: t('zoneSpot'), value: zone },
            { icon: Clock, label: t('dateTime'), value: dateTime },
            { icon: Clock, label: t('duration'), value: durationLabel },
            { icon: Car, label: t('vehicle'), value: vehicle },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center flex-shrink-0">
                <item.icon size={14} className="text-[#FF6B00]" />
              </div>
              <div>
                <p className="text-[#8B8B8B] text-xs">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashed separator */}
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-[#0a0a0a] -ml-2.5" />
          <div className="flex-1 border-t-2 border-dashed border-[#2a2a2a] mx-2" />
          <div className="w-5 h-5 rounded-full bg-[#0a0a0a] -mr-2.5" />
        </div>

        {/* Payment */}
        <div className="p-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#8B8B8B]">{t('rate')}</span>
            <span className="text-white">CHF {pricePerHour}/h</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#8B8B8B]">{t('duration')}</span>
            <span className="text-white">{formatDuration(duration)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-white">{isScheduled ? t('totalDue') : t('totalPaid')}</span>
            <span className="text-[#FF6B00] text-lg">CHF {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-3">{t('activityLog')}</h3>
        {activityItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-2 last:mb-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              item.color === 'green' ? 'bg-green-400' :
              item.color === 'blue' ? 'bg-blue-400' : 'bg-[#FF6B00]'
            }`} />
            <span className="text-[#8B8B8B] text-xs w-12">{item.time}</span>
            <span className="text-white text-xs">{item.event}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        <button className="flex-1 py-3 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm flex items-center justify-center gap-2">
          <Download size={16} /> {t('download')}
        </button>
        <button className="flex-1 py-3 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm flex items-center justify-center gap-2">
          <Share2 size={16} /> {t('share')}
        </button>
      </div>

      <button onClick={() => navigate('/home')} className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold">
        {t('done')}
      </button>
    </div>
  )
}

