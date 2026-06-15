import { useState, useEffect } from 'react'

export default function DrawerModal({ drawer, onSave, onClose }) {
  const [form, setForm] = useState({
    drawerNumber: '',
    itemName: '',
    sku: '',
    quantity: '',
    lowStockThreshold: '10',
  })

  useEffect(() => {
    if (drawer) {
      setForm({
        drawerNumber: drawer.drawerNumber,
        itemName: drawer.itemName,
        sku: drawer.sku,
        quantity: String(drawer.quantity),
        lowStockThreshold: String(drawer.lowStockThreshold),
      })
    }
  }, [drawer])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...(drawer ? { id: drawer.id, taken: drawer.taken } : {}),
      drawerNumber: form.drawerNumber.trim(),
      itemName: form.itemName.trim(),
      sku: form.sku.trim().toUpperCase(),
      quantity: Math.max(0, parseInt(form.quantity, 10) || 0),
      lowStockThreshold: Math.max(0, parseInt(form.lowStockThreshold, 10) || 0),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-ambient-lg w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-outline-variant">
          <h2 className="font-display font-bold text-title-md text-on-surface">
            {drawer ? 'Edit Drawer' : 'Add Drawer'}
          </h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-label text-on-surface-variant block mb-1.5">Drawer #</label>
              <input
                required
                value={form.drawerNumber}
                onChange={e => set('drawerNumber', e.target.value)}
                placeholder="A-01"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-label text-on-surface-variant block mb-1.5">SKU</label>
              <input
                required
                value={form.sku}
                onChange={e => set('sku', e.target.value)}
                placeholder="BLT-M8-25"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-label text-on-surface-variant block mb-1.5">Item Name</label>
            <input
              required
              value={form.itemName}
              onChange={e => set('itemName', e.target.value)}
              placeholder="M8 Bolt 25mm"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-label text-on-surface-variant block mb-1.5">Quantity</label>
              <input
                required
                type="number"
                min="0"
                value={form.quantity}
                onChange={e => set('quantity', e.target.value)}
                placeholder="50"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-label text-on-surface-variant block mb-1.5">Low Stock Alert</label>
              <input
                type="number"
                min="0"
                value={form.lowStockThreshold}
                onChange={e => set('lowStockThreshold', e.target.value)}
                placeholder="10"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-sm text-on-surface-variant border border-outline-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-sm text-white gradient-primary btn-scale"
            >
              {drawer ? 'Save Changes' : 'Add Drawer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
