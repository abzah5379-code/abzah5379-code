import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView,
} from 'react-native'
import DrawerCard from '../components/DrawerCard'
import DrawerModal from '../components/DrawerModal'
import UsersModal from '../components/UsersModal'
import { colors } from '../theme'

export default function HomeScreen({
  drawers, currentUser, users,
  onTake, onRestock, onSaveDrawer, onDeleteDrawer,
  onSaveUser, onDeleteUser, onLogout,
}) {
  const [search, setSearch] = useState('')
  const [drawerModalOpen, setDrawerModalOpen] = useState(false)
  const [editingDrawer, setEditingDrawer] = useState(null)
  const [usersModalOpen, setUsersModalOpen] = useState(false)

  const isManager = currentUser.role === 'manager'
  const lowCount = drawers.filter(d => d.quantity > 0 && d.quantity <= d.lowStockThreshold).length
  const emptyCount = drawers.filter(d => d.quantity === 0).length

  const filtered = drawers.filter(d => {
    const q = search.toLowerCase()
    return (
      d.drawerNumber.toLowerCase().includes(q) ||
      d.itemName.toLowerCase().includes(q) ||
      d.sku.toLowerCase().includes(q)
    )
  })

  const openAdd = () => { setEditingDrawer(null); setDrawerModalOpen(true) }
  const openEdit = (drawer) => { setEditingDrawer(drawer); setDrawerModalOpen(true) }

  const handleSaveDrawer = (drawer) => {
    onSaveDrawer(drawer)
    setDrawerModalOpen(false)
    setEditingDrawer(null)
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerTitle}>Warehouse</Text>
            <View style={s.badgeRow}>
              <Text style={s.countText}>{drawers.length} drawers</Text>
              {emptyCount > 0 && (
                <View style={s.badgeRed}><Text style={s.badgeRedTxt}>{emptyCount} empty</Text></View>
              )}
              {lowCount > 0 && (
                <View style={s.badgeAmber}><Text style={s.badgeAmberTxt}>{lowCount} low</Text></View>
              )}
            </View>
          </View>

          <View style={s.headerActions}>
            {isManager && (
              <TouchableOpacity style={s.iconBtn} onPress={() => setUsersModalOpen(true)}>
                <Text style={s.iconBtnTxt}>👥</Text>
              </TouchableOpacity>
            )}
            {isManager && (
              <TouchableOpacity style={s.addBtn} onPress={openAdd} activeOpacity={0.85}>
                <Text style={s.addBtnTxt}>+ Add</Text>
              </TouchableOpacity>
            )}
            <View style={s.userRow}>
              <View style={s.avatar}>
                <Text style={s.avatarTxt}>{currentUser.name.charAt(0).toUpperCase()}</Text>
              </View>
              <TouchableOpacity onPress={onLogout} style={s.logoutBtn}>
                <Text style={s.logoutTxt}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Drawer, item, or SKU…"
            placeholderTextColor={colors.onSurfaceVariant}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* ── List ── */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DrawerCard
            drawer={item}
            onTake={onTake}
            onRestock={onRestock}
            onEdit={isManager ? openEdit : null}
            onDelete={isManager ? onDeleteDrawer : null}
          />
        )}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyIcon}>📦</Text>
            <Text style={s.emptyTitle}>No drawers found</Text>
            <Text style={s.emptyText}>Try a different search or add a new drawer.</Text>
          </View>
        }
      />

      {drawerModalOpen && (
        <DrawerModal
          drawer={editingDrawer}
          onSave={handleSaveDrawer}
          onClose={() => { setDrawerModalOpen(false); setEditingDrawer(null) }}
        />
      )}
      {usersModalOpen && (
        <UsersModal
          users={users}
          currentUser={currentUser}
          onSave={onSaveUser}
          onDelete={onDeleteUser}
          onClose={() => setUsersModalOpen(false)}
        />
      )}
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },

  header: {
    backgroundColor: 'rgba(255,248,245,0.97)',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.onSurface },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  countText: { fontSize: 11, fontWeight: '600', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  badgeRed: { backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fca5a5', borderRadius: 20, paddingHorizontal: 7, paddingVertical: 2 },
  badgeRedTxt: { color: '#dc2626', fontSize: 11, fontWeight: '600' },
  badgeAmber: { backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#fcd34d', borderRadius: 20, paddingHorizontal: 7, paddingVertical: 2 },
  badgeAmberTxt: { color: '#d97706', fontSize: 11, fontWeight: '600' },

  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { padding: 9, borderRadius: 11, backgroundColor: colors.surfaceContainerLow },
  iconBtnTxt: { fontSize: 16 },
  addBtn: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 },
  addBtnTxt: { color: colors.white, fontSize: 13, fontWeight: '700' },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderLeftWidth: 1, borderLeftColor: colors.outlineVariant, paddingLeft: 10 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { color: colors.white, fontWeight: '700', fontSize: 14 },
  logoutBtn: { padding: 4 },
  logoutTxt: { fontSize: 12, color: colors.onSurfaceVariant, fontWeight: '600' },

  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 10 },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.onSurface, padding: 0 },

  list: { padding: 14, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.onSurface, marginBottom: 6 },
  emptyText: { fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center' },
})
