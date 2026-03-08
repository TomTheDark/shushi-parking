import { useNavigate } from 'react-router-dom'
import { Check, Download, Share2, MapPin, Clock, Car } from 'lucide-react'

const QR_PATTERN = [1,0,1,1,0,1,0,1,1,0,0,1,1,1,0,1]

export default function TicketScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] px-5 pb-8">
      <div className="pt-12 pb-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-3">
          <Check size={32} className="text-green-400" />
        </div>
        <h1 className="text-white text-xl font-bold">Booking Confirmed!</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">Your parking ticket details</p>
      </div>

      {/* Ticket card */}
      <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden mb-4">
        {/* Top */}
        <div className="bg-[#FF6B00] p-5">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">Booking ID</p>
              <p className="text-2xl font-bold tracking-wider">#BK-2024-001</p>
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
            { icon: MapPin, label: 'Location', value: 'Parking Cornavin' },
            { icon: MapPin, label: 'Zone / Spot', value: 'White Zone · A-013' },
            { icon: Clock, label: 'Date & Time', value: 'Jan 15, 2024 · 14:00' },
            { icon: Clock, label: 'Duration', value: '2 hours (until 16:00)' },
            { icon: Car, label: 'Vehicle', value: 'SL 250 ML · GE 123 456' },
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
            <span className="text-[#8B8B8B]">Rate</span>
            <span className="text-white">CHF 3.50/h</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#8B8B8B]">Duration</span>
            <span className="text-white">2h</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-white">Total Paid</span>
            <span className="text-[#FF6B00] text-lg">CHF 7.00</span>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-3">Activity Log</h3>
        {[
          { time: '14:00', event: 'Entry recorded', color: 'green' },
          { time: '14:05', event: 'Payment processed', color: 'blue' },
          { time: '16:00', event: 'Exit time', color: 'orange' },
        ].map(item => (
          <div key={item.time} className="flex items-center gap-3 mb-2 last:mb-0">
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
          <Download size={16} /> Download
        </button>
        <button className="flex-1 py-3 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm flex items-center justify-center gap-2">
          <Share2 size={16} /> Share
        </button>
      </div>

      <button onClick={() => navigate('/home')} className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-bold">
        Done
      </button>
    </div>
  )
}
