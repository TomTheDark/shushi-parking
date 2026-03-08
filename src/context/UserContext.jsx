import { createContext, useContext, useState } from 'react'
import { mockUser } from '../data/mockData'
import { translations } from '../i18n/translations'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(mockUser)

  const lang = user.language === 'Français' ? 'fr' : 'en'
  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key

  const updateUser = (fields) => setUser(u => ({ ...u, ...fields }))

  const addVehicle = ({ model, plate, type }) => {
    const newVehicle = { id: Date.now(), model, plate, type, isDefault: false }
    setUser(u => ({ ...u, vehicles: [...u.vehicles, newVehicle] }))
  }

  const updateVehicle = (id, fields) => {
    setUser(u => {
      const vehicles = u.vehicles.map(v => v.id === id ? { ...v, ...fields } : v)
      const defaultV = vehicles.find(v => v.isDefault)
      return {
        ...u,
        vehicles,
        car: defaultV
          ? { model: defaultV.model, plate: defaultV.plate, type: defaultV.type }
          : u.car,
      }
    })
  }

  const removeVehicle = (id) => {
    setUser(u => {
      let vehicles = u.vehicles.filter(v => v.id !== id)
      if (vehicles.length > 0 && !vehicles.some(v => v.isDefault)) {
        vehicles = vehicles.map((v, i) => ({ ...v, isDefault: i === 0 }))
      }
      const defaultV = vehicles.find(v => v.isDefault)
      return {
        ...u,
        vehicles,
        car: defaultV
          ? { model: defaultV.model, plate: defaultV.plate, type: defaultV.type }
          : u.car,
      }
    })
  }

  const setDefaultVehicle = (id) => {
    setUser(u => {
      const vehicles = u.vehicles.map(v => ({ ...v, isDefault: v.id === id }))
      const defaultV = vehicles.find(v => v.isDefault)
      return {
        ...u,
        vehicles,
        car: defaultV
          ? { model: defaultV.model, plate: defaultV.plate, type: defaultV.type }
          : u.car,
      }
    })
  }

  return (
    <UserContext.Provider value={{
      user, lang, t, updateUser,
      addVehicle, updateVehicle, removeVehicle, setDefaultVehicle,
    }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext)
}
