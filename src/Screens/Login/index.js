import React, { useState } from 'react';
import {
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
import ApiService from '../../services/api';
import { styles } from './styles';

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
      // Assuming response contains specific success indicator if needed
      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('homeScreen'), // Verifica se o nome da rota home é 'homeScreen'
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
              source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000' }}
              style={styles.imageBg}
              imageStyle={styles.headerImage}
            >
              <View style={styles.overlay}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation?.goBack()}
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

          {/* CARD DE FORMULÁRIO */}
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
