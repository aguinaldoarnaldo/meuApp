import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = 'http://192.168.150.240:3307/api/auth'
const LOGO = require('../../../assets/LIGA_transparente.png')

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const insets = useSafeAreaInsets()

  // ===== Função de Login =====
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }

    try {
      setLoading(true)

      console.log('📡 Enviando login para:', API_URL)

      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      })

      console.log('🟢 Resposta do backend:', response.data)

      if (!response.data.user) {
        Alert.alert('Erro', 'Resposta inválida do servidor.')
        return
      }

      const user = response.data.user
      const token = response.data.token || null

      // ===== SALVAR TODOS OS DADOS =====
      const userData = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        foto: user.foto || null,
        token: token,
      }

      await AsyncStorage.setItem('userData', JSON.stringify(userData))

      console.log('📦 Dados salvos no AsyncStorage:', userData)

      Alert.alert('✅ Sucesso', 'Login realizado com sucesso!')

      // ===== ENVIA OS DADOS TAMBÉM VIA NAVIGATE (opcional) =====
      navigation.replace('HomeScreen', { user: userData })
    } catch (error) {
      console.log('❌ Erro de login:', error)

      const errorMessage =
        error.response?.data?.message || 'E-mail ou senha incorretos.'

      Alert.alert('Falha no Login', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho azul */}
      <View style={[styles.headerArea, { paddingTop: insets.top + 20 }]}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logo} />
        </View>

        <Text style={styles.headerTitle}>Bem-vindo de volta 👋</Text>
        <Text style={styles.headerSubtitle}>
          Entra na tua conta e continua a comunicar em gestos!
        </Text>
      </View>

      {/* Área branca */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.whiteArea}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="teuemail@exemplo.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />

              <Text style={styles.inputLabel}>Palavra-passe</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
              />

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupPrompt}>
                  Ainda não tens uma conta?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('SignupScreen')}
                >
                  <Text style={styles.signupLink}>Criar conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A67FF' },
  headerArea: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoContainer: { marginBottom: 15 },
  logo: { width: 60, height: 60, resizeMode: 'contain' },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D0E2FF',
    textAlign: 'center',
    marginBottom: 10,
  },
  whiteArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  formContainer: { paddingHorizontal: 30, paddingTop: 30, paddingBottom: 40 },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  button: {
    height: 55,
    backgroundColor: '#0A67FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  signupPrompt: { fontSize: 15, color: '#333', marginRight: 5 },
  signupLink: { fontSize: 15, fontWeight: 'bold', color: '#0A67FF' },
})
