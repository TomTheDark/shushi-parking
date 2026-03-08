import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Car, Zap } from 'lucide-react'

const slides = [
  {
    icon: Car,
    title: "Made Easy Parking",
    desc: "Find available parking spots near you in real time. Reserve your spot in seconds and never circle the block again.",
    color: "#FF6B00",
  },
  {
    icon: Zap,
    title: "Awesome EV Charging",
    desc: "Locate EV charging stations alongside parking. Charge your vehicle while you park – simple and convenient.",
    color: "#4CAF50",
  },
]

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  
  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      navigate('/home')
    }
  }
  
  const slide = slides[current]
  const Icon = slide.icon
  
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] px-6 pt-12 pb-10">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/home')} className="text-[#8B8B8B] text-sm font-medium">
          Skip
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#FF6B00]' : 'w-2 bg-[#2a2a2a]'}`} />
          ))}
        </div>
        <div className="w-8" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: slide.color }} />
          <div className="relative w-40 h-40 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ backgroundColor: slide.color + '22' }}>
              <Icon size={48} style={{ color: slide.color }} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white text-center mb-4">{slide.title}</h1>
        <p className="text-[#8B8B8B] text-center leading-relaxed text-base max-w-xs">{slide.desc}</p>
      </div>
      
      <button
        onClick={handleNext}
        className="w-full py-4 rounded-2xl bg-[#FF6B00] text-white font-semibold text-lg flex items-center justify-center gap-2 active:opacity-90"
      >
        {current < slides.length - 1 ? 'Next' : 'Get Started'}
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
