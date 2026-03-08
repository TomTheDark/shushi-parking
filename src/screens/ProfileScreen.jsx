import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, Mail, Phone, CreditCard, Car, Globe, ChevronRight,
  LogOut, Settings, Bell, Shield, ArrowLeft, Edit2, Check,
} from 'lucide-react'
import { mockUser } from '../data/mockData'
import BottomNav from '../components/BottomNav'

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <p className="text-[#8B8B8B] text-xs font-semibold uppercase tracking-widest px-5 mb-2">{title}</p>
      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden mx-5">
        {children}
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value, onPress, last = false, danger = false, iconColor = '#FF6B00' }) {
  return (
    <button
      onClick={onPress}
      className={`w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 ${!last ? 'border-b border-[#2a2a2a]' : ''}`}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: danger ? '#F4433620' : `${iconColor}20` }}>
        <Icon size={16} style={{ color: danger ? '#F44336' : iconColor }} />
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
        {value && <p className="text-[#8B8B8B] text-xs mt-0.5">{value}</p>}
      </div>
      {!danger && <ChevronRight size={14} className="text-[#8B8B8B]" />}
    </button>
  )
}

export default function ProfileScreen() {
  const navigate = useNavigate()
  const [user, setUser] = useState(mockUser)
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')

  const startEdit = (field, currentValue) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const saveEdit = () => {
    if (editingField === 'name') setUser(u => ({ ...u, name: editValue }))
    if (editingField === 'phone') setUser(u => ({ ...u, phone: editValue }))
    if (editingField === 'email') setUser(u => ({ ...u, email: editValue }))
    setEditingField(null)
  }

  const fieldLabels = { name: 'Name', phone: 'Phone', email: 'Email' }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-[#0a0a0a]">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <p className="text-[#8B8B8B] text-sm">Manage your account</p>
      </div>

      {/* Avatar + name */}
      <div className="flex flex-col items-center py-5 mb-2">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-[#FF6B00]/20 border-2 border-[#FF6B00]/40 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#FF6B00]">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <button
            onClick={() => startEdit('name', user.name)}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FF6B00] flex items-center justify-center"
          >
            <Edit2 size={12} className="text-white" />
          </button>
        </div>
        <h2 className="text-white text-lg font-bold">{user.name}</h2>
        <p className="text-[#8B8B8B] text-sm">{user.email}</p>
      </div>

      {/* Edit field modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="w-full max-w-[430px] mx-auto bg-[#1a1a1a] rounded-t-3xl p-5">
            <h3 className="text-white font-semibold mb-4">Edit {fieldLabels[editingField]}</h3>
            <input
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              className="w-full bg-[#242424] text-white rounded-xl px-4 py-3 mb-4 outline-none border border-[#3a3a3a] focus:border-[#FF6B00] text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditingField(null)}
                className="flex-1 py-3 rounded-xl border border-[#3a3a3a] text-[#8B8B8B] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <Check size={14} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal info */}
      <Section title="Personal Information">
        <Row icon={User} label="Name" value={user.name} onPress={() => startEdit('name', user.name)} />
        <Row icon={Phone} label="Phone" value={user.phone} onPress={() => startEdit('phone', user.phone)} />
        <Row icon={Mail} label="Email" value={user.email} onPress={() => startEdit('email', user.email)} last />
      </Section>

      {/* Vehicles */}
      <Section title="Vehicles">
        {user.vehicles.map((v, i) => (
          <Row
            key={v.id}
            icon={Car}
            label={`${v.model} (${v.type})`}
            value={`${v.plate}${v.isDefault ? ' · Default' : ''}`}
            onPress={() => {}}
            last={i === user.vehicles.length - 1}
          />
        ))}
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <Row
          icon={CreditCard}
          label="Preferred Payment"
          value={user.preferredPayment}
          onPress={() => {}}
          iconColor="#4CAF50"
        />
        <Row
          icon={Globe}
          label="Language"
          value={user.language}
          onPress={() => {}}
          iconColor="#2196F3"
          last
        />
      </Section>

      {/* App settings */}
      <Section title="App">
        <Row icon={Bell} label="Notifications" value="Enabled" onPress={() => {}} iconColor="#FFC107" />
        <Row icon={Shield} label="Privacy & Security" onPress={() => {}} iconColor="#9C27B0" />
        <Row icon={Settings} label="Settings" onPress={() => {}} iconColor="#607D8B" last />
      </Section>

      {/* Sign out */}
      <Section title="Account">
        <Row icon={LogOut} label="Sign Out" onPress={() => navigate('/onboarding')} danger last />
      </Section>

      <BottomNav />
    </div>
  )
}
