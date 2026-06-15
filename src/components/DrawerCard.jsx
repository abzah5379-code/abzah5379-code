import { useState } from 'react'

export default function DrawerCard({ drawer, onTake, onRestock, onEdit, onDelete }) {
  const { id, drawerNumber, itemName, sku, quantity, taken, lowStockThreshold } = drawer
  const [restocking, setRestocking] = useState(false)
  const [restockAmount, setRestockAmount] = useState('')
  const [flash, setFlash] = useState(false)

  const isLow = quantity > 0 && quantity <= lowStockThreshold
  const isEmpty = quantity === 0

  const handleTake = () => {
    if (isEmpty) return
    setFlash(true)
    onTake(id)
    setTimeout(() => setFlash(false), 180)
  }

  const handleRestock = () => {
    const amt = parseInt(restockAmount, 10)
    if (!amt || amt <= 0) return
    onRestock(id, amt)
    setRestockAmount('')
    setRestocking(false)
  }

  const qtyColor = isEmpty
    ? 'text-red-500'
    : isLow
    ? 'text-amber-600'
    : 'text-secondary'

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-shadow duration-200 hover:shadow-ambient ${
      isEmpty ? 'border-red-200' : isLow ? 'border-amber-200' : 'border-outline-variant'
    }`}>
      {/* Header strip */}
      <div className={`px-4 pt-4 pb-3 border-b ${
        isEmpty ? 'border-red-100' : isLow ? 'border-amber-100' : 'border-outline-variant'
      }`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-label font-bold tracking-widest text-primary">{drawerNumber}</span>
            <h3 className="font-display font-semibold text-on-surface text-base leading-snug mt-0.5 truncate">{itemName}</h3>
            <p className="text-label text-on-surface-variant mt-0.5">{sku}</p>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex gap-1 shrink-0 mt-0.5">
              {onEdit && (
                <button
                  onClick={() => onEdit(drawer)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
                  title="Edit"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(id)}
                  className="text-on-surface-variant hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 flex items-center gap-5">
        <div>
          <p className="text-label text-on-surface-variant mb-0.5">In Stock</p>
          <p className={`text-4xl font-bold font-display leading-none transition-all duration-150 ${qtyColor} ${flash ? 'scale-90' : 'scale-100'}`}>
            {quantity}
          </p>
        </div>
        <div className="w-px self-stretch bg-outline-variant" />
        <div>
          <p className="text-label text-on-surface-variant mb-0.5">Taken</p>
          <p className="text-4xl font-bold font-display leading-none text-on-surface/30">{taken}</p>
        </div>
        {(isLow || isEmpty) && (
          <div className="ml-auto">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              isEmpty
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {isEmpty ? 'Empty' : 'Low Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        <button
          onClick={handleTake}
          disabled={isEmpty}
          className={`w-full py-3.5 rounded-xl font-display font-bold text-base transition-all duration-150 active:scale-95 select-none ${
            isEmpty
              ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
              : 'bg-secondary text-white hover:bg-secondary/90 shadow-sm active:shadow-none cursor-pointer'
          }`}
        >
          {isEmpty ? 'Out of Stock' : '− Take 1'}
        </button>

        {!restocking ? (
          <button
            onClick={() => setRestocking(true)}
            className="w-full py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors border border-outline-variant"
          >
            + Restock
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              value={restockAmount}
              onChange={e => setRestockAmount(e.target.value)}
              placeholder="Qty"
              min="1"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') handleRestock()
                if (e.key === 'Escape') { setRestocking(false); setRestockAmount('') }
              }}
              className="flex-1 border border-outline-variant rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-surface"
            />
            <button
              onClick={handleRestock}
              className="px-4 py-2 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => { setRestocking(false); setRestockAmount('') }}
              className="px-3 py-2 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container transition-colors border border-outline-variant"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
