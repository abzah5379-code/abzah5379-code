import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native'
import { colors } from '../theme'

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!username.trim() || !password) {
      setError('Please enter username and password.')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = onLogin(username.trim(), password)
      if (!ok) {
        setError('Incorrect username or password.')
        setLoading(false)
      }
    }, 250)
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.kav}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

          <View style={s.logo}>
            <View style={s.logoBox}>
              <Text style={s.logoEmoji}>📦</Text>
            </View>
            <Text style={s.title}>Warehouse</Text>
            <Text style={s.subtitle}>Inventory Management</Text>
          </View>

          <View style={s.card}>
            <Text style={s.cardTitle}>Sign In</Text>

            <View style={s.field}>
              <Text style={s.label}>Username</Text>
              <TextInput
                style={s.input}
                value={username}
                onChangeText={t => { setUsername(t); setError('') }}
                placeholder="Enter username"
                placeholderTextColor={colors.onSurfaceVariant}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={s.field}>
              <Text style={s.label}>Password</Text>
              <TextInput
                style={s.input}
                value={password}
                onChangeText={t => { setPassword(t); setError('') }}
                placeholder="Enter password"
                placeholderTextColor={colors.onSurfaceVariant}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            {!!error && (
              <View style={s.errorBox}>
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[s.btn, loading && s.btnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={s.btnText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.hint}>
            Default logins: <Text style={s.hintBold}>manager</Text> or <Text style={s.hintBold}>employee</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },

  logo: { alignItems: 'center', marginBottom: 32 },
  logoBox: {
    width: 76, height: 76, borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
  },
  logoEmoji: { fontSize: 38 },
  title: { fontSize: 30, fontWeight: '700', color: colors.onSurface, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 },

  card: {
    backgroundColor: colors.white, borderRadius: 22, padding: 24,
    borderWidth: 1, borderColor: colors.outlineVariant,
    shadowColor: '#1f1b18', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 14, elevation: 4,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: colors.onSurface, marginBottom: 20 },

  field: { marginBottom: 16 },
  label: {
    fontSize: 11, fontWeight: '600', color: colors.onSurfaceVariant,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6,
  },
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 13,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
  },

  errorBox: {
    backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fca5a5',
    borderRadius: 11, paddingHorizontal: 13, paddingVertical: 10, marginBottom: 16,
  },
  errorText: { color: '#dc2626', fontSize: 13 },

  btn: {
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 4,
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 5,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },

  hint: { textAlign: 'center', fontSize: 12, color: colors.onSurfaceVariant, marginTop: 24 },
  hintBold: { fontWeight: '700', color: colors.onSurface },
})
