import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert,
  ScrollView, useWindowDimensions 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const { height } = useWindowDimensions();
  
  const [form, setForm] = useState({
    nome: '', telefone: '', senha: '', confirmar: ''
  });

  // Ajustamos a altura do cabeçalho para empurrar o formulário um pouco mais para baixo
  const headerHeight = height * 0.28; 

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Azul */}
      <View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Vamos Começar</Text>
        <Text style={styles.subtitle}>Criar uma conta nova</Text>
      </View>

      {/* Área do Formulário */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.formWrapper}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* O padding superior aqui controla o quão "baixo" o formulário começa */}
            <View style={styles.inputGap}>
              <InputLabel label="Nome" placeholder="Insira aqui seu nome" />
              <InputLabel label="Telefone" placeholder="923 000 000" keyboardType="numeric" />
              <InputLabel label="Senha" placeholder="Sua senha" secureTextEntry />
              <InputLabel label="Confirmar Senha" placeholder="Confirme a sua senha" secureTextEntry />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Registar</Text>
            </TouchableOpacity>
            
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const InputLabel = ({ label, ...props }) => (
  <View style={styles.inputWrapper}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput 
      style={styles.input} 
      placeholderTextColor="#A0A0A0" 
      {...props} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#002D5E' 
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 10 : 30,
    backgroundColor: '#FFF',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
  },
  backIcon: { fontSize: 32, color: '#002D5E', fontWeight: '300', marginBottom: 5 },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#FFF', fontSize: 16, opacity: 0.8, marginTop: 4 },
  
  formWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollContent: {
    paddingHorizontal: '9%',
    // Aumentamos o paddingTop para o formulário descer
    paddingTop: 60, 
    paddingBottom: 20,
  },
  inputGap: {
    marginBottom: 10, // Espaço entre o último input e o botão
  },
  inputWrapper: {
    marginBottom: 28, // Aumentei o espaçamento entre os campos
    borderWidth: 1.2,
    borderColor: '#333',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
  },
  label: { 
    fontSize: 13, 
    color: '#333', 
    fontWeight: 'bold' 
  },
  input: { 
    fontSize: 16, 
    color: '#000',
  },
  button: {
    backgroundColor: '#002D5E',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});