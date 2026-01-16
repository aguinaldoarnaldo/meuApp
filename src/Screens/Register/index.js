import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert,
  ScrollView, useWindowDimensions, ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';

export default function RegisterScreen({ navigation }) {
  const { height } = useWindowDimensions();
  
  const [form, setForm] = useState({
    nome: '', telefone: '', senha: '', confirmar: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.nome || !form.telefone || !form.senha || !form.confirmar) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.register(form.nome, form.telefone, form.senha, form.confirmar);
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('LoginScreen'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  // Ajustamos a altura do cabeçalho para empurrar o formulário um pouco mais para baixo
  const headerHeight = height * 0.28; 

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Azul */}
      <View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
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
              <InputLabel 
                label="Nome" 
                placeholder="Insira aqui seu nome" 
                value={form.nome}
                onChangeText={(text) => setForm({...form, nome: text})}
              />
              <InputLabel 
                label="Telefone" 
                placeholder="923 000 000" 
                keyboardType="phone-pad"
                value={form.telefone}
                onChangeText={(text) => setForm({...form, telefone: text})}
              />
              <InputLabel 
                label="Senha" 
                placeholder="Sua senha" 
                secureTextEntry 
                value={form.senha}
                onChangeText={(text) => setForm({...form, senha: text})}
              />
              <InputLabel 
                label="Confirmar Senha" 
                placeholder="Confirme a sua senha" 
                secureTextEntry 
                value={form.confirmar}
                onChangeText={(text) => setForm({...form, confirmar: text})}
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Registar</Text>
              )}
            </TouchableOpacity>
            
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const InputLabel = ({ label, value, onChangeText, ...props }) => (
  <View style={styles.inputWrapper}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput 
      style={styles.input} 
      placeholderTextColor="#A0A0A0" 
      value={value}
      onChangeText={onChangeText}
      {...props} 
    />
  </View>
);
