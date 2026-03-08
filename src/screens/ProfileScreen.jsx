import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, Mail, Phone, CreditCard, Car, Globe, ChevronRight,
  LogOut, Settings, Bell, Shield, ArrowLeft, Edit2, Check,
  Plus, Trash2, Star,
} from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { useUser } from '../context/UserContext'

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

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Electric', 'Motorcycle', 'Van', 'Other']
const LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'Français', value: 'Français' },
]

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { user, updateUser, addVehicle, updateVehicle, removeVehicle, setDefaultVehicle, t } = useUser()

  // Personal info editing
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')

  // Vehicle editing
  const [vehicleModal, setVehicleModal] = useState(null) // null | { mode: 'add' | 'edit', vehicle?: obj }
  const [vForm, setVForm] = useState({ model: '', plate: '', type: 'Sedan' })

  // Vehicle actions (long-press / tap sheet)
  const [vehicleActionId, setVehicleActionId] = useState(null)

  // Language picker
  const [showLangPicker, setShowLangPicker] = useState(false)

  const startEdit = (field, currentValue) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const saveEdit = () => {
    if (editingField === 'name') updateUser({ name: editValue })
    if (editingField === 'phone') updateUser({ phone: editValue })
    if (editingField === 'email') updateUser({ email: editValue })
    setEditingField(null)
  }

  const openAddVehicle = () => {
    setVForm({ model: '', plate: '', type: 'Sedan' })
    setVehicleModal({ mode: 'add' })
  }

  const openEditVehicle = (vehicle) => {
    setVForm({ model: vehicle.model, plate: vehicle.plate, type: vehicle.type })
    setVehicleModal({ mode: 'edit', vehicle })
    setVehicleActionId(null)
  }

  const saveVehicle = () => {
    if (!vForm.model.trim() || !vForm.plate.trim()) return
    if (vehicleModal.mode === 'add') {
      addVehicle(vForm)
    } else {
      updateVehicle(vehicleModal.vehicle.id, vForm)
    }
    setVehicleModal(null)
  }

  const handleDeleteVehicle = (id) => {
    removeVehicle(id)
    setVehicleActionId(null)
  }

  const handleSetDefault = (id) => {
    setDefaultVehicle(id)
    setVehicleActionId(null)
  }

  const fieldLabels = {
    name: t('name'), phone: t('phone'), email: t('email'),
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-[#0a0a0a]">
        <h1 className="text-xl font-bold text-white">{t('profile')}</h1>
        <p className="text-[#8B8B8B] text-sm">{t('manageYourAccount')}</p>
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

      {/* ── MODALS ── */}

      {/* Personal field edit modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end">
          <div className="w-full max-w-[430px] mx-auto bg-[#1a1a1a] rounded-t-3xl p-5 pb-10">
            <h3 className="text-white font-semibold mb-4">{t('editField')} {fieldLabels[editingField]}</h3>
            <input
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveEdit()}
              className="w-full bg-[#242424] text-white rounded-xl px-4 py-3 mb-4 outline-none border border-[#3a3a3a] focus:border-[#FF6B00] text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditingField(null)}
                className="flex-1 py-3 rounded-xl border border-[#3a3a3a] text-[#8B8B8B] text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <Check size={14} /> {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle add/edit modal */}
      {vehicleModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end">
          <div className="w-full max-w-[430px] mx-auto bg-[#1a1a1a] rounded-t-3xl p-5 pb-10">
            <h3 className="text-white font-semibold mb-4">
              {vehicleModal.mode === 'add' ? t('addVehicle') : t('editVehicle')}
            </h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[#8B8B8B] text-xs mb-1 block">{t('model')}</label>
                <input
                  autoFocus
                  value={vForm.model}
                  onChange={e => setVForm(f => ({ ...f, model: e.target.value }))}
                  placeholder="e.g. Tesla Model 3"
                  className="w-full bg-[#242424] text-white rounded-xl px-4 py-3 outline-none border border-[#3a3a3a] focus:border-[#FF6B00] text-sm"
                />
              </div>
              <div>
                <label className="text-[#8B8B8B] text-xs mb-1 block">{t('plate')}</label>
                <input
                  value={vForm.plate}
                  onChange={e => setVForm(f => ({ ...f, plate: e.target.value }))}
                  placeholder="e.g. GE 123 456"
                  className="w-full bg-[#242424] text-white rounded-xl px-4 py-3 outline-none border border-[#3a3a3a] focus:border-[#FF6B00] text-sm tracking-widest"
                />
              </div>
              <div>
                <label className="text-[#8B8B8B] text-xs mb-1 block">{t('type')}</label>
                <div className="flex flex-wrap gap-2">
                  {VEHICLE_TYPES.map(tp => (
                    <button
                      key={tp}
                      onClick={() => setVForm(f => ({ ...f, type: tp }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        vForm.type === tp
                          ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                          : 'border-[#3a3a3a] text-[#8B8B8B]'
                      }`}
                    >
                      {tp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setVehicleModal(null)}
                className="flex-1 py-3 rounded-xl border border-[#3a3a3a] text-[#8B8B8B] text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button
                onClick={saveVehicle}
                disabled={!vForm.model.trim() || !vForm.plate.trim()}
                className="flex-1 py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Check size={14} /> {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle action sheet */}
      {vehicleActionId !== null && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end" onClick={() => setVehicleActionId(null)}>
          <div
            className="w-full max-w-[430px] mx-auto bg-[#1a1a1a] rounded-t-3xl p-5 pb-10"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold mb-4">{t('vehicleActions')}</h3>
            <div className="space-y-2">
              {!user.vehicles.find(v => v.id === vehicleActionId)?.isDefault && (
                <button
                  onClick={() => handleSetDefault(vehicleActionId)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#242424] text-yellow-400"
                >
                  <Star size={16} />
                  <span className="text-sm font-medium">{t('setAsDefault')}</span>
                </button>
              )}
              <button
                onClick={() => openEditVehicle(user.vehicles.find(v => v.id === vehicleActionId))}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#242424] text-white"
              >
                <Edit2 size={16} />
                <span className="text-sm font-medium">{t('editVehicle')}</span>
              </button>
              {user.vehicles.length > 1 && (
                <button
                  onClick={() => handleDeleteVehicle(vehicleActionId)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 text-red-400"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">{t('deleteVehicle')}</span>
                </button>
              )}
              <button
                onClick={() => setVehicleActionId(null)}
                className="w-full p-3 rounded-xl border border-[#3a3a3a] text-[#8B8B8B] text-sm font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language picker */}
      {showLangPicker && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end" onClick={() => setShowLangPicker(false)}>
          <div
            className="w-full max-w-[430px] mx-auto bg-[#1a1a1a] rounded-t-3xl p-5 pb-10"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold mb-4">{t('selectLanguage')}</h3>
            <div className="space-y-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.value}
                  onClick={() => { updateUser({ language: lang.value }); setShowLangPicker(false) }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    user.language === lang.value
                      ? 'bg-[#FF6B00]/10 border-[#FF6B00]'
                      : 'bg-[#242424] border-[#3a3a3a]'
                  }`}
                >
                  <span className="text-white font-medium">{lang.label}</span>
                  {user.language === lang.value && <Check size={16} className="text-[#FF6B00]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personal info */}
      <Section title={t('personalInformation')}>
        <Row icon={User} label={t('name')} value={user.name} onPress={() => startEdit('name', user.name)} />
        <Row icon={Phone} label={t('phone')} value={user.phone} onPress={() => startEdit('phone', user.phone)} />
        <Row icon={Mail} label={t('email')} value={user.email} onPress={() => startEdit('email', user.email)} last />
      </Section>

      {/* Vehicles */}
      <Section title={t('vehicles')}>
        {user.vehicles.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setVehicleActionId(v.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 ${
              i < user.vehicles.length - 1 ? 'border-b border-[#2a2a2a]' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center flex-shrink-0">
              <Car size={16} className="text-[#FF6B00]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium">{v.model} ({v.type})</p>
              <p className="text-[#8B8B8B] text-xs mt-0.5">
                {v.plate}{v.isDefault ? ` · ${t('defaultLabel')}` : ''}
              </p>
            </div>
            <ChevronRight size={14} className="text-[#8B8B8B]" />
          </button>
        ))}
        {/* Add vehicle button */}
        <button
          onClick={openAddVehicle}
          className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 border-t border-[#2a2a2a]"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-[#FF6B00]" />
          </div>
          <p className="text-[#FF6B00] text-sm font-medium flex-1 text-left">{t('addVehicle')}</p>
        </button>
      </Section>

      {/* Preferences */}
      <Section title={t('preferences')}>
        <Row
          icon={CreditCard}
          label={t('preferredPayment')}
          value={user.preferredPayment}
          onPress={() => {}}
          iconColor="#4CAF50"
        />
        <Row
          icon={Globe}
          label={t('language')}
          value={user.language}
          onPress={() => setShowLangPicker(true)}
          iconColor="#2196F3"
          last
        />
      </Section>

      {/* App settings */}
      <Section title={t('app')}>
        <Row icon={Bell} label={t('notifications')} value={t('enabled')} onPress={() => {}} iconColor="#FFC107" />
        <Row icon={Shield} label={t('privacySecurity')} onPress={() => {}} iconColor="#9C27B0" />
        <Row icon={Settings} label={t('settings')} onPress={() => {}} iconColor="#607D8B" last />
      </Section>

      {/* Sign out */}
      <Section title={t('account')}>
        <Row icon={LogOut} label={t('signOut')} onPress={() => navigate('/onboarding')} danger last />
      </Section>

      <BottomNav />
    </div>
  )
}

