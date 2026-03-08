import { useNavigate, useLocation } from 'react-router-dom'
import { Calendar, MapPin, Clock, ChevronRight, Car, Plus } from 'lucide-react'
import { mockBookings } from '../data/mockData'
import BottomNav from '../components/BottomNav'
import { useUser } from '../context/UserContext'

const STATUS_KEYS = {
  upcoming: { bg: 'bg-blue-500/20', text: 'text-blue-400', labelKey: 'upcoming' },
  active: { bg: 'bg-green-500/20', text: 'text-green-400', labelKey: 'active' },
  completed: { bg: 'bg-[#2a2a2a]', text: 'text-[#8B8B8B]', labelKey: 'completed' },
}

export default function BookingsScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useUser()

  const upcoming = mockBookings.filter(b => b.status === 'upcoming' || b.status === 'active')
  const past = mockBookings.filter(b => b.status === 'completed')
  const justScheduled = location.state?.justScheduled

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-[#0a0a0a]">
        <h1 className="text-xl font-bold text-white">{t('myBookings')}</h1>
        <p className="text-[#8B8B8B] text-sm">{mockBookings.length} {t('reservationsTotal')}</p>
      </div>

      {/* Scheduled success banner */}
      {justScheduled && (
        <div className="mx-5 mb-4 p-3 rounded-2xl bg-green-500/15 border border-green-500/30">
          <p className="text-green-400 text-sm text-center">{t('bookingScheduledSuccess')}</p>
        </div>
      )}

      {/* Empty state */}
      {mockBookings.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Calendar size={36} className="text-[#8B8B8B]" />
          </div>
          <h2 className="text-white text-lg font-bold mb-2">{t('noBookingsYet')}</h2>
          <p className="text-[#8B8B8B] text-sm text-center mb-6">{t('findParkingAndBook')}</p>
          <button
            onClick={() => navigate('/parking-map')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6B00] text-white font-semibold"
          >
            <Plus size={16} /> {t('findParking')}
          </button>
        </div>
      )}

      {/* Upcoming / active */}
      {upcoming.length > 0 && (
        <div className="px-5 mb-5">
          <h2 className="text-white font-semibold mb-3">{t('upcoming')}</h2>
          {upcoming.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              t={t}
              onPress={() => navigate('/ticket', { state: { booking } })}
            />
          ))}
        </div>
      )}

      {/* Past bookings */}
      {past.length > 0 && (
        <div className="px-5">
          <h2 className="text-white font-semibold mb-3">{t('pastBookings')}</h2>
          {past.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              t={t}
              onPress={() => navigate('/ticket', { state: { booking } })}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      {mockBookings.length > 0 && (
        <div className="px-5 mt-4">
          <button
            onClick={() => navigate('/parking-map')}
            className="w-full py-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] text-white font-medium flex items-center justify-center gap-2"
          >
            <Plus size={16} className="text-[#FF6B00]" /> {t('bookAnotherParking')}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

function BookingCard({ booking, onPress, t }) {
  const s = STATUS_KEYS[booking.status] || STATUS_KEYS.completed

  return (
    <button
      onClick={onPress}
      className="w-full bg-[#1a1a1a] rounded-2xl p-4 mb-3 text-left active:opacity-80"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
              {t(s.labelKey)}
            </span>
            <span className="text-[#8B8B8B] text-xs">#{booking.id}</span>
          </div>
          <h3 className="text-white font-bold text-base">{booking.parkingName}</h3>
        </div>
        <ChevronRight size={16} className="text-[#8B8B8B] mt-1 flex-shrink-0" />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-[#FF6B00] flex-shrink-0" />
          <span className="text-[#8B8B8B] text-xs">{booking.zone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#FF6B00] flex-shrink-0" />
          <span className="text-[#8B8B8B] text-xs">{booking.date} · {booking.time} · {booking.duration}h</span>
        </div>
        <div className="flex items-center gap-2">
          <Car size={12} className="text-[#FF6B00] flex-shrink-0" />
          <span className="text-[#8B8B8B] text-xs">{booking.vehicle}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
        <span className="text-[#8B8B8B] text-xs">{t('totalPaid')}</span>
        <span className="text-[#FF6B00] font-bold text-sm">CHF {booking.total.toFixed(2)}</span>
      </div>
    </button>
  )
}
