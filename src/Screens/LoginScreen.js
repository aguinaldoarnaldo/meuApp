import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.login(phone, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('homeScreen'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ajusta a cor dos ícones da barra de status (hora, bateria) */}
      <StatusBar barStyle="light-content" backgroundColor="#002D5E" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >

          {/* CABEÇALHO COM IMAGEM */}
          <View style={styles.headerContainer}>
            <ImageBackground
              // Use uma imagem válida. Se esta não abrir, tente uma local com require()
              source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000' }}
              style={styles.imageBg}
              imageStyle={styles.headerImage}
            >
              <View style={styles.overlay}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation?.goBack()} // Proteção caso navigation não exista
                >
                  <Ionicons name="chevron-back" size={24} color="#002D5E" />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                  <Text style={styles.title}>Bem-Vindo(a) de Volta</Text>
                  <Text style={styles.subtitle}>Faça login na sua conta</Text>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* CARD BRANCO DE FORMULÁRIO */}
          <View style={styles.formContainer}>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Telefone</Text>
              <View style={styles.inputField}>
                <TextInput
                  placeholder="923 000 000"
                  placeholderTextColor="#AAA"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Senha</Text>
              <View style={styles.inputField}>
                <TextInput
                  placeholder="Sua senha"
                  placeholderTextColor="#AAA"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueci a minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.noAccountText}>Ainda não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate("RegisterScreen")}>
                <Text style={styles.registerText}>Registar-se</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002D5E',
  },
  headerContainer: {
    height: 250,
    width: '100%',
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 45, 94, 0.6)', // Aqui você controla a "cor azul" sobre a foto
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 40,
    marginTop: -40, // Faz o card sobrepor a imagem
    minHeight: 500, // Garante que o fundo branco preencha a tela
  },
  inputWrapper: {
    marginBottom: 25,
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    zIndex: 1,
    fontSize: 12,
    color: '#002D5E',
    fontWeight: '600',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#002D5E',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#002D5E',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#002D5E',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  noAccountText: {
    color: '#666',
    fontSize: 14,
  },
  registerText: {
    color: '#002D5E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
});