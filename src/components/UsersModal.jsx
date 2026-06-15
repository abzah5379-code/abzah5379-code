import { useState } from 'react'

const emptyForm = { name: '', username: '', password: '', role: 'employee' }

export default function UsersModal({ users, currentUser, onSave, onDelete, onClose }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const set = (key, val) => { setForm(prev => ({ ...prev, [key]: val })); setError('') }

  const managerCount = users.filter(u => u.role === 'manager').length

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setAdding(true); setError('') }
  const openEdit = (user) => {
    setAdding(true)
    setEditingId(user.id)
    setForm({ name: user.name, username: user.username, password: user.password, role: user.role })
    setError('')
  }
  const cancelForm = () => { setAdding(false); setEditingId(null); setForm(emptyForm); setError('') }

  const handleSave = (e) => {
    e.preventDefault()
    const trimmed = { ...form, name: form.name.trim(), username: form.username.trim() }
    if (!trimmed.name || !trimmed.username || !trimmed.password) {
      setError('All fields are required.')
      return
    }
    const duplicate = users.find(u => u.username === trimmed.username && u.id !== editingId)
    if (duplicate) { setError('Username already taken.'); return }
    onSave(editingId ? { ...trimmed, id: editingId } : trimmed)
    cancelForm()
  }

  const handleDelete = (user) => {
    if (user.id === currentUser.id) return
    if (user.role === 'manager' && managerCount <= 1) return
    onDelete(user.id)
  }

  const roleBadge = (role) => role === 'manager'
    ? 'bg-primary/10 text-primary border-primary/20'
    : 'bg-secondary/10 text-secondary border-secondary/20'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-ambient-lg w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-outline-variant shrink-0">
          <div>
            <h2 className="font-display font-bold text-title-md text-on-surface">Manage Users</h2>
            <p className="text-label text-on-surface-variant mt-0.5">{users.length} accounts</p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User list */}
        <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-2">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant bg-surface-container-lowest">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-on-surface text-sm truncate">{user.name}</span>
                  {user.id === currentUser.id && (
                    <span className="text-label text-on-surface-variant">(you)</span>
                  )}
                </div>
                <p className="text-label text-on-surface-variant">@{user.username}</p>
              </div>
              <span className={`text-label font-semibold px-2 py-0.5 rounded-full border shrink-0 ${roleBadge(user.role)}`}>
                {user.role}
              </span>
              <button
                onClick={() => openEdit(user)}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors shrink-0"
                title="Edit"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button
                onClick={() => handleDelete(user)}
                disabled={user.id === currentUser.id || (user.role === 'manager' && managerCount <= 1)}
                className="text-on-surface-variant hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                title={user.id === currentUser.id ? "Can't delete yourself" : user.role === 'manager' && managerCount <= 1 ? 'Last manager' : 'Delete'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add / Edit form */}
        <div className="px-6 pb-6 pt-2 border-t border-outline-variant shrink-0">
          {!adding ? (
            <button
              onClick={openAdd}
              className="w-full py-2.5 rounded-xl font-semibold text-sm gradient-primary text-white btn-scale flex items-center justify-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add User
            </button>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <p className="font-semibold text-sm text-on-surface">{editingId ? 'Edit User' : 'New User'}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-label text-on-surface-variant block mb-1">Full Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" className="input-field" />
                </div>
                <div>
                  <label className="text-label text-on-surface-variant block mb-1">Username</label>
                  <input value={form.username} onChange={e => set('username', e.target.value)} placeholder="janesmith" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-label text-on-surface-variant block mb-1">Password</label>
                  <input type="text" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="text-label text-on-surface-variant block mb-1">Role</label>
                  <select value={form.role} onChange={e => set('role', e.target.value)} className="input-field bg-white">
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              {error && <p className="text-red-600 text-xs">{error}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={cancelForm} className="flex-1 py-2 rounded-xl text-sm font-semibold text-on-surface-variant border border-outline-variant hover:bg-surface-container transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 rounded-xl text-sm font-semibold text-white gradient-primary btn-scale">
                  {editingId ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
