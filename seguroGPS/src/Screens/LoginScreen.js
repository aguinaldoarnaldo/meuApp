import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          
          {/* CABEÇALHO AZUL */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#002D5E" />
            </TouchableOpacity>
            
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Bem-Vindo(a) de Volta</Text>
              <Text style={styles.subtitle}>Faça login na sua conta</Text>
            </View>
          </View>

          {/* CARD BRANCO DE FORMULÁRIO */}
          <View style={styles.formContainer}>
            
            {/* INPUT TELEFONE */}
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

            {/* INPUT SENHA */}
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

            {/* BOTÃO ESQUECI A SENHA */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueci a minha senha</Text>
            </TouchableOpacity>

            {/* BOTÃO ENTRAR */}
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            {/* MENSAGEM PARA QUEM NÃO TEM CONTA */}
            <View style={styles.registerContainer}>
              <Text style={styles.noAccountText}>Ainda não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
    backgroundColor: '#002D5E', // Azul escuro do cabeçalho
  },
  header: {
    height: 250,
    paddingHorizontal: 25,
    paddingTop: 20,
    justifyContent: 'flex-start',
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
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFF', // Fundo branco do card
    borderTopLeftRadius: 36,
    borderTopRightRadius: 39,
    paddingHorizontal: 30,
    paddingTop: 57,
  },
  inputWrapper: {
    marginBottom: 40,
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
    marginTop: 10,
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
});