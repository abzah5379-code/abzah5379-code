import { useState, useEffect } from 'react'
import Header from './components/Header'
import DrawerGrid from './components/DrawerGrid'
import DrawerModal from './components/DrawerModal'
import LoginPage from './components/LoginPage'
import UsersModal from './components/UsersModal'

const DRAWERS_KEY = 'warehouse_drawers'
const USERS_KEY = 'warehouse_users'
const SESSION_KEY = 'warehouse_session'

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

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => load(SESSION_KEY, null))
  const [users, setUsers] = useState(() => load(USERS_KEY, defaultUsers))
  const [drawers, setDrawers] = useState(() => load(DRAWERS_KEY, sampleDrawers))
  const [search, setSearch] = useState('')
  const [drawerModalOpen, setDrawerModalOpen] = useState(false)
  const [editingDrawer, setEditingDrawer] = useState(null)
  const [usersModalOpen, setUsersModalOpen] = useState(false)

  useEffect(() => { localStorage.setItem(DRAWERS_KEY, JSON.stringify(drawers)) }, [drawers])
  useEffect(() => { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }, [users])
  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
    else localStorage.removeItem(SESSION_KEY)
  }, [currentUser])

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
      setUsers(prev => [...prev, { ...user, id: crypto.randomUUID() }])
    }
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const take = (id) => {
    setDrawers(prev => prev.map(d =>
      d.id === id && d.quantity > 0
        ? { ...d, quantity: d.quantity - 1, taken: d.taken + 1 }
        : d
    ))
  }

  const restock = (id, amount) => {
    setDrawers(prev => prev.map(d =>
      d.id === id ? { ...d, quantity: d.quantity + amount } : d
    ))
  }

  const saveDrawer = (drawer) => {
    if (drawer.id) {
      setDrawers(prev => prev.map(d => d.id === drawer.id ? drawer : d))
    } else {
      setDrawers(prev => [...prev, { ...drawer, id: crypto.randomUUID(), taken: 0 }])
    }
    setDrawerModalOpen(false)
    setEditingDrawer(null)
  }

  const deleteDrawer = (id) => setDrawers(prev => prev.filter(d => d.id !== id))

  const filtered = drawers.filter(d => {
    const q = search.toLowerCase()
    return (
      d.drawerNumber.toLowerCase().includes(q) ||
      d.itemName.toLowerCase().includes(q) ||
      d.sku.toLowerCase().includes(q)
    )
  })

  const isManager = currentUser?.role === 'manager'
  const lowCount = drawers.filter(d => d.quantity > 0 && d.quantity <= d.lowStockThreshold).length
  const emptyCount = drawers.filter(d => d.quantity === 0).length

  if (!currentUser) {
    return <LoginPage onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header
        search={search}
        onSearch={setSearch}
        onAdd={isManager ? () => { setEditingDrawer(null); setDrawerModalOpen(true) } : null}
        onManageUsers={isManager ? () => setUsersModalOpen(true) : null}
        total={drawers.length}
        lowCount={lowCount}
        emptyCount={emptyCount}
        currentUser={currentUser}
        onLogout={logout}
      />
      <DrawerGrid
        drawers={filtered}
        onTake={take}
        onRestock={restock}
        onEdit={isManager ? (d) => { setEditingDrawer(d); setDrawerModalOpen(true) } : null}
        onDelete={isManager ? deleteDrawer : null}
      />
      {drawerModalOpen && (
        <DrawerModal
          drawer={editingDrawer}
          onSave={saveDrawer}
          onClose={() => { setDrawerModalOpen(false); setEditingDrawer(null) }}
        />
      )}
      {usersModalOpen && (
        <UsersModal
          users={users}
          currentUser={currentUser}
          onSave={saveUser}
          onDelete={deleteUser}
          onClose={() => setUsersModalOpen(false)}
        />
      )}
    </div>
  )
}
