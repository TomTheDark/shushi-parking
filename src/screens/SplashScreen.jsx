import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParkingSquare } from 'lucide-react'

export default function SplashScreen() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 2500)
    return () => clearTimeout(timer)
  }, [navigate])
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a]">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-[#FF6B00] opacity-20 blur-2xl animate-pulse" />
        <div className="relative z-10 w-24 h-24 rounded-3xl bg-[#FF6B00] flex items-center justify-center shadow-lg shadow-[#FF6B00]/40">
          <ParkingSquare size={48} className="text-white" strokeWidth={2} />
        </div>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white tracking-tight">Sushi Parking</h1>
      <p className="mt-2 text-[#8B8B8B] text-sm">Find & Book Parking Spots</p>
      <div className="absolute bottom-12 flex gap-1.5">
        {[0,1,2].map(i => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#FF6B00]' : 'bg-[#2a2a2a]'}`} />
        ))}
      </div>
    </div>
  )
}
