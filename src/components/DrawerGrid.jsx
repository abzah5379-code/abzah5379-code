import DrawerCard from './DrawerCard'

export default function DrawerGrid({ drawers, onTake, onRestock, onEdit, onDelete }) {
  if (drawers.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="font-display font-semibold text-xl text-on-surface mb-2">No drawers found</h2>
        <p className="text-on-surface-variant text-sm">Try a different search or add a new drawer.</p>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {drawers.map(drawer => (
          <DrawerCard
            key={drawer.id}
            drawer={drawer}
            onTake={onTake}
            onRestock={onRestock}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </main>
  )
}
