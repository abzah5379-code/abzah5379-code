import { useState, useEffect } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native'
import { colors } from '../theme'

export default function DrawerModal({ drawer, onSave, onClose }) {
  const [form, setForm] = useState({ drawerNumber: '', itemName: '', sku: '', quantity: '', lowStockThreshold: '10' })

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

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = () => {
    if (!form.drawerNumber.trim() || !form.itemName.trim() || !form.sku.trim()) return
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
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.kav}>
        <TouchableOpacity style={s.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={s.sheet}>
          <View style={s.handle} />
          <View style={s.header}>
            <Text style={s.title}>{drawer ? 'Edit Drawer' : 'Add Drawer'}</Text>
            <TouchableOpacity onPress={onClose} style={s.closeBtn}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={s.body} keyboardShouldPersistTaps="handled">
            <View style={s.row}>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Drawer #</Text>
                <TextInput style={s.input} value={form.drawerNumber} onChangeText={v => set('drawerNumber', v)} placeholder="A-01" placeholderTextColor={colors.onSurfaceVariant} />
              </View>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>SKU</Text>
                <TextInput style={s.input} value={form.sku} onChangeText={v => set('sku', v)} placeholder="BLT-M8-25" placeholderTextColor={colors.onSurfaceVariant} autoCapitalize="characters" />
              </View>
            </View>

            <View style={s.field}>
              <Text style={s.label}>Item Name</Text>
              <TextInput style={s.input} value={form.itemName} onChangeText={v => set('itemName', v)} placeholder="M8 Bolt 25mm" placeholderTextColor={colors.onSurfaceVariant} />
            </View>

            <View style={s.row}>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Quantity</Text>
                <TextInput style={s.input} value={form.quantity} onChangeText={v => set('quantity', v)} placeholder="50" keyboardType="number-pad" placeholderTextColor={colors.onSurfaceVariant} />
              </View>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Low Stock Alert</Text>
                <TextInput style={s.input} value={form.lowStockThreshold} onChangeText={v => set('lowStockThreshold', v)} placeholder="10" keyboardType="number-pad" placeholderTextColor={colors.onSurfaceVariant} />
              </View>
            </View>

            <View style={s.btnRow}>
              <TouchableOpacity onPress={onClose} style={s.cancelBtn}>
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={s.saveBtn} activeOpacity={0.85}>
                <Text style={s.saveTxt}>{drawer ? 'Save Changes' : 'Add Drawer'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const s = StyleSheet.create({
  kav: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(31,27,24,0.5)' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: '90%' },
  handle: { width: 36, height: 4, backgroundColor: colors.outlineVariant, borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  title: { fontSize: 18, fontWeight: '700', color: colors.onSurface },
  closeBtn: { padding: 6, borderRadius: 8, backgroundColor: colors.surfaceContainerLow },
  closeTxt: { fontSize: 14, color: colors.onSurfaceVariant },
  body: { padding: 20 },
  row: { flexDirection: 'row', gap: 12 },
  field: { marginBottom: 16 },
  label: { fontSize: 11, fontWeight: '600', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 4, paddingBottom: 12 },
  cancelBtn: { flex: 1, paddingVertical: 15, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, alignItems: 'center' },
  cancelTxt: { color: colors.onSurfaceVariant, fontWeight: '600', fontSize: 15 },
  saveBtn: { flex: 1, paddingVertical: 15, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center' },
  saveTxt: { color: colors.white, fontWeight: '700', fontSize: 15 },
})
