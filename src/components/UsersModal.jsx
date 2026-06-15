import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, ScrollView, Alert,
} from 'react-native'
import { colors } from '../theme'

const EMPTY = { name: '', username: '', password: '', role: 'employee' }

export default function UsersModal({ users, currentUser, onSave, onDelete, onClose }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError('') }
  const managerCount = users.filter(u => u.role === 'manager').length

  const openAdd = () => { setEditingId(null); setForm(EMPTY); setAdding(true); setError('') }
  const openEdit = (u) => { setEditingId(u.id); setForm({ name: u.name, username: u.username, password: u.password, role: u.role }); setAdding(true); setError('') }
  const cancel = () => { setAdding(false); setEditingId(null); setForm(EMPTY); setError('') }

  const handleSave = () => {
    const f = { ...form, name: form.name.trim(), username: form.username.trim() }
    if (!f.name || !f.username || !f.password) { setError('All fields are required.'); return }
    const dup = users.find(u => u.username === f.username && u.id !== editingId)
    if (dup) { setError('Username already taken.'); return }
    onSave(editingId ? { ...f, id: editingId } : f)
    cancel()
  }

  const handleDelete = (user) => {
    if (user.id === currentUser.id || (user.role === 'manager' && managerCount <= 1)) return
    Alert.alert('Delete User', `Remove "${user.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(user.id) },
    ])
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.backdrop} onPress={onClose} activeOpacity={1} />
      <View style={s.sheet}>
        <View style={s.handle} />
        <View style={s.header}>
          <View>
            <Text style={s.title}>Manage Users</Text>
            <Text style={s.sub}>{users.length} accounts</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={s.closeBtn}>
            <Text style={s.closeTxt}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={s.body} keyboardShouldPersistTaps="handled">
          {users.map(user => (
            <View key={user.id} style={s.userRow}>
              <View style={s.avatar}>
                <Text style={s.avatarTxt}>{user.name.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={s.userInfo}>
                <View style={s.nameRow}>
                  <Text style={s.userName}>{user.name}</Text>
                  {user.id === currentUser.id && <Text style={s.youTag}>(you)</Text>}
                </View>
                <Text style={s.userUsername}>@{user.username}</Text>
              </View>
              <View style={[s.roleBadge, user.role === 'manager' ? s.roleManager : s.roleEmployee]}>
                <Text style={[s.roleTxt, user.role === 'manager' ? s.roleTxtManager : s.roleTxtEmployee]}>
                  {user.role}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openEdit(user)} style={s.actionBtn}>
                <Text style={s.actionTxt}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(user)}
                style={[s.actionBtn, (user.id === currentUser.id || (user.role === 'manager' && managerCount <= 1)) && s.actionBtnOff]}
                disabled={user.id === currentUser.id || (user.role === 'manager' && managerCount <= 1)}
              >
                <Text style={s.actionTxt}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add/edit form */}
          <View style={s.formSection}>
            {!adding ? (
              <TouchableOpacity onPress={openAdd} style={s.addBtn} activeOpacity={0.85}>
                <Text style={s.addBtnTxt}>+ Add User</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={s.formTitle}>{editingId ? 'Edit User' : 'New User'}</Text>
                <View style={s.row}>
                  <View style={[s.field, { flex: 1 }]}>
                    <Text style={s.label}>Full Name</Text>
                    <TextInput style={s.input} value={form.name} onChangeText={v => set('name', v)} placeholder="Jane Smith" placeholderTextColor={colors.onSurfaceVariant} />
                  </View>
                  <View style={[s.field, { flex: 1 }]}>
                    <Text style={s.label}>Username</Text>
                    <TextInput style={s.input} value={form.username} onChangeText={v => set('username', v)} placeholder="janesmith" autoCapitalize="none" placeholderTextColor={colors.onSurfaceVariant} />
                  </View>
                </View>
                <View style={s.field}>
                  <Text style={s.label}>Password</Text>
                  <TextInput style={s.input} value={form.password} onChangeText={v => set('password', v)} placeholder="password" placeholderTextColor={colors.onSurfaceVariant} />
                </View>
                <View style={s.field}>
                  <Text style={s.label}>Role</Text>
                  <View style={s.roleToggle}>
                    <TouchableOpacity onPress={() => set('role', 'employee')} style={[s.roleOpt, form.role === 'employee' && s.roleOptActive]}>
                      <Text style={[s.roleOptTxt, form.role === 'employee' && s.roleOptTxtActive]}>Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => set('role', 'manager')} style={[s.roleOpt, form.role === 'manager' && s.roleOptActive]}>
                      <Text style={[s.roleOptTxt, form.role === 'manager' && s.roleOptTxtActive]}>Manager</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {!!error && <Text style={s.error}>{error}</Text>}
                <View style={s.btnRow}>
                  <TouchableOpacity onPress={cancel} style={s.cancelBtn}>
                    <Text style={s.cancelTxt}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSave} style={s.saveBtn} activeOpacity={0.85}>
                    <Text style={s.saveTxt}>{editingId ? 'Save' : 'Create'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(31,27,24,0.5)' },
  sheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: '88%' },
  handle: { width: 36, height: 4, backgroundColor: colors.outlineVariant, borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  title: { fontSize: 18, fontWeight: '700', color: colors.onSurface },
  sub: { fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 },
  closeBtn: { padding: 6, borderRadius: 8, backgroundColor: colors.surfaceContainerLow },
  closeTxt: { fontSize: 14, color: colors.onSurfaceVariant },
  body: { padding: 16 },

  userRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { color: colors.white, fontWeight: '700', fontSize: 14 },
  userInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userName: { fontSize: 14, fontWeight: '600', color: colors.onSurface },
  youTag: { fontSize: 11, color: colors.onSurfaceVariant },
  userUsername: { fontSize: 12, color: colors.onSurfaceVariant },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, borderWidth: 1 },
  roleManager: { backgroundColor: 'rgba(160,63,40,0.08)', borderColor: 'rgba(160,63,40,0.2)' },
  roleEmployee: { backgroundColor: 'rgba(74,103,65,0.08)', borderColor: 'rgba(74,103,65,0.2)' },
  roleTxt: { fontSize: 11, fontWeight: '600' },
  roleTxtManager: { color: colors.primary },
  roleTxtEmployee: { color: colors.secondary },
  actionBtn: { padding: 7, borderRadius: 9, backgroundColor: colors.surfaceContainerLow },
  actionBtnOff: { opacity: 0.3 },
  actionTxt: { fontSize: 13 },

  formSection: { marginTop: 16, paddingBottom: 24 },
  formTitle: { fontSize: 15, fontWeight: '700', color: colors.onSurface, marginBottom: 14 },
  addBtn: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  addBtnTxt: { color: colors.white, fontWeight: '700', fontSize: 15 },
  row: { flexDirection: 'row', gap: 12 },
  field: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '600', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 11, fontSize: 14, color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest },
  roleToggle: { flexDirection: 'row', borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12, overflow: 'hidden' },
  roleOpt: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: colors.surfaceContainerLowest },
  roleOptActive: { backgroundColor: colors.secondary },
  roleOptTxt: { fontSize: 13, fontWeight: '600', color: colors.onSurfaceVariant },
  roleOptTxtActive: { color: colors.white },
  error: { color: '#dc2626', fontSize: 13, marginBottom: 10 },
  btnRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, paddingVertical: 13, borderRadius: 13, borderWidth: 1, borderColor: colors.outlineVariant, alignItems: 'center' },
  cancelTxt: { color: colors.onSurfaceVariant, fontWeight: '600', fontSize: 14 },
  saveBtn: { flex: 1, paddingVertical: 13, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center' },
  saveTxt: { color: colors.white, fontWeight: '700', fontSize: 14 },
})
