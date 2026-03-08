import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Calendar, User } from 'lucide-react'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const tabs = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/parking-map' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]
  
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#1a1a1a] border-t border-[#2a2a2a] z-50">
      <div className="flex items-center justify-around px-4 py-3">
        {tabs.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path ||
            (path === '/bookings' && location.pathname === '/ticket')
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon
                size={22}
                className={isActive ? 'text-[#FF6B00]' : 'text-[#8B8B8B]'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-[#FF6B00]' : 'text-[#8B8B8B]'}`}>
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#FF6B00] mt-0.5" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
