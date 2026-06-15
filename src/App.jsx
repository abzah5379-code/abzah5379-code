import { useState, useEffect } from 'react'
import Header from './components/Header'
import DrawerGrid from './components/DrawerGrid'
import DrawerModal from './components/DrawerModal'

const STORAGE_KEY = 'warehouse_drawers'

const sampleData = [
  { id: '1', drawerNumber: 'A-01', itemName: 'M8 Bolt 25mm', sku: 'BLT-M8-25', quantity: 47, taken: 3, lowStockThreshold: 10 },
  { id: '2', drawerNumber: 'A-02', itemName: 'M8 Hex Nut', sku: 'NUT-M8-SS', quantity: 8, taken: 42, lowStockThreshold: 15 },
  { id: '3', drawerNumber: 'B-01', itemName: 'Phillips Screw #4', sku: 'SCR-PH4-25', quantity: 120, taken: 30, lowStockThreshold: 20 },
  { id: '4', drawerNumber: 'B-02', itemName: 'Cable Tie 200mm', sku: 'TIE-200-BK', quantity: 5, taken: 95, lowStockThreshold: 20 },
  { id: '5', drawerNumber: 'C-01', itemName: 'Washer M10', sku: 'WSH-M10-ZN', quantity: 200, taken: 50, lowStockThreshold: 30 },
  { id: '6', drawerNumber: 'C-02', itemName: 'O-Ring 15mm', sku: 'ORG-15-RB', quantity: 0, taken: 20, lowStockThreshold: 5 },
]

export default function App() {
  const [drawers, setDrawers] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : sampleData
    } catch {
      return sampleData
    }
  })
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDrawer, setEditingDrawer] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drawers))
  }, [drawers])

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
    setModalOpen(false)
    setEditingDrawer(null)
  }

  const deleteDrawer = (id) => {
    setDrawers(prev => prev.filter(d => d.id !== id))
  }

  const filtered = drawers.filter(d => {
    const q = search.toLowerCase()
    return (
      d.drawerNumber.toLowerCase().includes(q) ||
      d.itemName.toLowerCase().includes(q) ||
      d.sku.toLowerCase().includes(q)
    )
  })

  const openAdd = () => { setEditingDrawer(null); setModalOpen(true) }
  const openEdit = (drawer) => { setEditingDrawer(drawer); setModalOpen(true) }

  const lowCount = drawers.filter(d => d.quantity > 0 && d.quantity <= d.lowStockThreshold).length
  const emptyCount = drawers.filter(d => d.quantity === 0).length

  return (
    <div className="min-h-screen bg-surface">
      <Header
        search={search}
        onSearch={setSearch}
        onAdd={openAdd}
        total={drawers.length}
        lowCount={lowCount}
        emptyCount={emptyCount}
      />
      <DrawerGrid
        drawers={filtered}
        onTake={take}
        onRestock={restock}
        onEdit={openEdit}
        onDelete={deleteDrawer}
      />
      {modalOpen && (
        <DrawerModal
          drawer={editingDrawer}
          onSave={saveDrawer}
          onClose={() => { setModalOpen(false); setEditingDrawer(null) }}
        />
      )}
    </div>
  )
}
