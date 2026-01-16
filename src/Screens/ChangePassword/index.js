import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';
import { theme } from '../../styles/theme';

export default function ChangePasswordScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    senha_atual: '',
    nova_senha: '',
    confirmar_senha: '',
  });

  const handleChangePassword = async () => {
    // Validações
    if (!formData.senha_atual || !formData.nova_senha || !formData.confirmar_senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (formData.nova_senha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.nova_senha !== formData.confirmar_senha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (formData.senha_atual === formData.nova_senha) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual');
      return;
    }

    setLoading(true);
    try {
      await ApiService.changePassword(
        formData.senha_atual,
        formData.nova_senha,
        formData.confirmar_senha
      );

      Alert.alert(
        'Sucesso',
        'Senha alterada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar formulário e voltar
              setFormData({
                senha_atual: '',
                nova_senha: '',
                confirmar_senha: '',
              });
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Alterar Senha</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ícone de Segurança */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-closed" size={50} color={theme.colors.primary} />
            </View>
          </View>

          <Text style={styles.description}>
            Digite sua senha atual e escolha uma nova senha segura
          </Text>

          {/* Campo Senha Atual */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha Atual</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrentPassword}
                value={formData.senha_atual}
                onChangeText={(text) => setFormData(prev => ({ ...prev, senha_atual: text }))}
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Campo Nova Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nova Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua nova senha (mín. 6 caracteres)"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
                value={formData.nova_senha}
                onChangeText={(text) => setFormData(prev => ({ ...prev, nova_senha: text }))}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Mínimo de 6 caracteres</Text>
          </View>

          {/* Campo Confirmar Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Nova Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua nova senha"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmar_senha}
                onChangeText={(text) => setFormData(prev => ({ ...prev, confirmar_senha: text }))}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {formData.nova_senha && formData.confirmar_senha && (
              <Text style={[
                styles.helperText,
                formData.nova_senha === formData.confirmar_senha 
                  ? styles.helperTextSuccess 
                  : styles.helperTextError
              ]}>
                {formData.nova_senha === formData.confirmar_senha 
                  ? '✓ Senhas coincidem' 
                  : '✗ Senhas não coincidem'}
              </Text>
            )}
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.saveButtonText}>Alterar Senha</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Informações de Segurança */}
          <View style={styles.securityTips}>
            <Text style={styles.securityTipsTitle}>Dicas de Segurança:</Text>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.secondary} />
              <Text style={styles.tipText}>Use pelo menos 6 caracteres</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.secondary} />
              <Text style={styles.tipText}>Combine letras e números</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.secondary} />
              <Text style={styles.tipText}>Não compartilhe sua senha</Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
