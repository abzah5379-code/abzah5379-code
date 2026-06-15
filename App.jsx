import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'

const DRAWERS_KEY = 'wh_drawers'
const USERS_KEY = 'wh_users'
const SESSION_KEY = 'wh_session'

const defaultUsers = [
  { id: '1', name: 'Admin Manager', username: 'manager', password: 'manager123', role: 'manager' },
  { id: '2', name: 'John Employee', username: 'employee', password: 'employee123', role: 'employee' },
]

const sampleDrawers = [
  { id: '1', drawerNumber: 'A-01', itemName: 'M8 Bolt 25mm', sku: 'BLT-M8-25', quantity: 47, taken: 3, lowStockThreshold: 10 },
  { id: '2', drawerNumber: 'A-02', itemName: 'M8 Hex Nut', sku: 'NUT-M8-SS', quantity: 8, taken: 42, lowStockThreshold: 15 },
  { id: '3', drawerNumber: 'B-01', itemName: 'Phillips Screw #4', sku: 'SCR-PH4-25', quantity: 120, taken: 30, lowStockThreshold: 20 },
  { id: '4', drawerNumber: 'B-02', itemName: 'Cable Tie 200mm', sku: 'TIE-200-BK', quantity: 5, taken: 95, lowStockThreshold: 20 },
  { id: '5', drawerNumber: 'C-01', itemName: 'Washer M10', sku: 'WSH-M10-ZN', quantity: 200, taken: 50, lowStockThreshold: 30 },
  { id: '6', drawerNumber: 'C-02', itemName: 'O-Ring 15mm', sku: 'ORG-15-RB', quantity: 0, taken: 20, lowStockThreshold: 5 },
]

export default function App() {
  const [ready, setReady] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(defaultUsers)
  const [drawers, setDrawers] = useState(sampleDrawers)

  useEffect(() => {
    async function load() {
      try {
        const [s, u, d] = await Promise.all([
          AsyncStorage.getItem(SESSION_KEY),
          AsyncStorage.getItem(USERS_KEY),
          AsyncStorage.getItem(DRAWERS_KEY),
        ])
        if (s) setCurrentUser(JSON.parse(s))
        if (u) setUsers(JSON.parse(u))
        if (d) setDrawers(JSON.parse(d))
      } finally {
        setReady(true)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (ready) AsyncStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [users, ready])

  useEffect(() => {
    if (ready) AsyncStorage.setItem(DRAWERS_KEY, JSON.stringify(drawers))
  }, [drawers, ready])

  useEffect(() => {
    if (!ready) return
    if (currentUser) AsyncStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
    else AsyncStorage.removeItem(SESSION_KEY)
  }, [currentUser, ready])

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) return false
    setCurrentUser({ id: user.id, name: user.name, username: user.username, role: user.role })
    return true
  }

  const logout = () => setCurrentUser(null)

  const saveUser = (user) => {
    if (user.id) {
      setUsers(prev => prev.map(u => u.id === user.id ? user : u))
      if (currentUser?.id === user.id) {
        setCurrentUser({ id: user.id, name: user.name, username: user.username, role: user.role })
      }
    } else {
      setUsers(prev => [...prev, { ...user, id: String(Date.now()) }])
    }
  }

  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id))

  const take = (id) =>
    setDrawers(prev => prev.map(d =>
      d.id === id && d.quantity > 0 ? { ...d, quantity: d.quantity - 1, taken: d.taken + 1 } : d
    ))

  const restock = (id, amount) =>
    setDrawers(prev => prev.map(d =>
      d.id === id ? { ...d, quantity: d.quantity + amount } : d
    ))

  const saveDrawer = (drawer) => {
    if (drawer.id) {
      setDrawers(prev => prev.map(d => d.id === drawer.id ? drawer : d))
    } else {
      setDrawers(prev => [...prev, { ...drawer, id: String(Date.now()), taken: 0 }])
    }
  }

  const deleteDrawer = (id) => setDrawers(prev => prev.filter(d => d.id !== id))

  if (!ready) return null

  if (!currentUser) {
    return (
      <>
        <StatusBar style="dark" />
        <LoginScreen onLogin={login} />
      </>
    )
  }

  return (
    <>
      <StatusBar style="dark" />
      <HomeScreen
        drawers={drawers}
        currentUser={currentUser}
        users={users}
        onTake={take}
        onRestock={restock}
        onSaveDrawer={saveDrawer}
        onDeleteDrawer={deleteDrawer}
        onSaveUser={saveUser}
        onDeleteUser={deleteUser}
        onLogout={logout}
      />
    </>
  )
}
