import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { colors } from '../theme'

export default function DrawerCard({ drawer, onTake, onRestock, onEdit, onDelete }) {
  const { id, drawerNumber, itemName, sku, quantity, taken, lowStockThreshold } = drawer
  const [restocking, setRestocking] = useState(false)
  const [restockAmount, setRestockAmount] = useState('')

  const isLow = quantity > 0 && quantity <= lowStockThreshold
  const isEmpty = quantity === 0

  const handleDelete = () => {
    Alert.alert(
      'Delete Drawer',
      `Remove "${drawerNumber} – ${itemName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
      ]
    )
  }

  const handleRestock = () => {
    const amt = parseInt(restockAmount, 10)
    if (!amt || amt <= 0) return
    onRestock(id, amt)
    setRestockAmount('')
    setRestocking(false)
  }

  const qtyColor = isEmpty ? '#dc2626' : isLow ? '#d97706' : colors.secondary
  const borderColor = isEmpty ? '#fca5a5' : isLow ? '#fcd34d' : colors.outlineVariant
  const headerBorderColor = isEmpty ? '#fee2e2' : isLow ? '#fef3c7' : colors.outlineVariant

  return (
    <View style={[s.card, { borderColor }]}>
      {/* Top: drawer info + edit/delete */}
      <View style={[s.cardTop, { borderBottomColor: headerBorderColor }]}>
        <View style={s.info}>
          <Text style={s.drawerNum}>{drawerNumber}</Text>
          <Text style={s.itemName} numberOfLines={1}>{itemName}</Text>
          <Text style={s.sku}>{sku}</Text>
        </View>
        {(onEdit || onDelete) && (
          <View style={s.topActions}>
            {onEdit && (
              <TouchableOpacity onPress={() => onEdit(drawer)} style={s.iconBtn}>
                <Text style={s.iconBtnTxt}>✏️</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={handleDelete} style={s.iconBtn}>
                <Text style={s.iconBtnTxt}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Stats */}
      <View style={s.stats}>
        <View style={s.stat}>
          <Text style={s.statLabel}>In Stock</Text>
          <Text style={[s.statNum, { color: qtyColor }]}>{quantity}</Text>
        </View>
        <View style={s.statDivider} />
        <View style={s.stat}>
          <Text style={s.statLabel}>Taken</Text>
          <Text style={[s.statNum, { color: colors.onSurface + '40' }]}>{taken}</Text>
        </View>
        {(isLow || isEmpty) && (
          <View style={s.badgeWrap}>
            <View style={[s.badge, isEmpty ? s.badgeEmpty : s.badgeLow]}>
              <Text style={[s.badgeTxt, isEmpty ? s.badgeEmptyTxt : s.badgeLowTxt]}>
                {isEmpty ? 'Empty' : 'Low Stock'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={s.actions}>
        <TouchableOpacity
          onPress={() => !isEmpty && onTake(id)}
          disabled={isEmpty}
          style={[s.takeBtn, isEmpty && s.takeBtnOff]}
          activeOpacity={0.78}
        >
          <Text style={[s.takeTxt, isEmpty && s.takeTxtOff]}>
            {isEmpty ? 'Out of Stock' : '− Take 1'}
          </Text>
        </TouchableOpacity>

        {!restocking ? (
          <TouchableOpacity onPress={() => setRestocking(true)} style={s.restockBtn} activeOpacity={0.78}>
            <Text style={s.restockTxt}>+ Restock</Text>
          </TouchableOpacity>
        ) : (
          <View style={s.restockRow}>
            <TextInput
              style={s.restockInput}
              value={restockAmount}
              onChangeText={setRestockAmount}
              placeholder="Qty"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="number-pad"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleRestock}
            />
            <TouchableOpacity onPress={handleRestock} style={s.restockAdd}>
              <Text style={s.restockAddTxt}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setRestocking(false); setRestockAmount('') }} style={s.restockCancel}>
              <Text style={s.restockCancelTxt}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.white, borderRadius: 18, borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#1f1b18', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: 16, borderBottomWidth: 1,
  },
  info: { flex: 1, marginRight: 8 },
  drawerNum: { fontSize: 11, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 },
  itemName: { fontSize: 16, fontWeight: '600', color: colors.onSurface, marginBottom: 2 },
  sku: { fontSize: 11, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  topActions: { flexDirection: 'row', gap: 6 },
  iconBtn: { padding: 7, borderRadius: 9, backgroundColor: colors.surfaceContainerLow },
  iconBtnTxt: { fontSize: 14 },

  stats: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  stat: {},
  statLabel: { fontSize: 11, fontWeight: '600', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  statNum: { fontSize: 42, fontWeight: '700', lineHeight: 46 },
  statDivider: { width: 1, height: 44, backgroundColor: colors.outlineVariant, marginHorizontal: 20 },
  badgeWrap: { flex: 1, alignItems: 'flex-end' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  badgeEmpty: { backgroundColor: '#fef2f2', borderColor: '#fca5a5' },
  badgeLow: { backgroundColor: '#fffbeb', borderColor: '#fcd34d' },
  badgeTxt: { fontSize: 12, fontWeight: '600' },
  badgeEmptyTxt: { color: '#dc2626' },
  badgeLowTxt: { color: '#d97706' },

  actions: { paddingHorizontal: 14, paddingBottom: 14, gap: 8 },
  takeBtn: {
    backgroundColor: colors.secondary, borderRadius: 14, paddingVertical: 17,
    alignItems: 'center',
    shadowColor: colors.secondary, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  takeBtnOff: { backgroundColor: colors.surfaceContainer, shadowOpacity: 0, elevation: 0 },
  takeTxt: { color: colors.white, fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
  takeTxtOff: { color: colors.onSurfaceVariant },

  restockBtn: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  restockTxt: { color: colors.onSurfaceVariant, fontSize: 14, fontWeight: '600' },

  restockRow: { flexDirection: 'row', gap: 8 },
  restockInput: {
    flex: 1, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11, fontSize: 15,
    color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest,
  },
  restockAdd: { backgroundColor: colors.secondary, borderRadius: 12, paddingHorizontal: 16, justifyContent: 'center' },
  restockAddTxt: { color: colors.white, fontWeight: '700', fontSize: 14 },
  restockCancel: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12, paddingHorizontal: 13, justifyContent: 'center' },
  restockCancelTxt: { color: colors.onSurfaceVariant, fontSize: 14 },
})
