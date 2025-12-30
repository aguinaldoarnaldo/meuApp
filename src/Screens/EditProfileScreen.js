import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ApiService from '../services/api';

export default function EditProfileScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [validatingBI, setValidatingBI] = useState(false);
  const [biValidated, setBiValidated] = useState(false);

  const [formData, setFormData] = useState({
    bi: '',
    nome: '',
    data_nascimento: '',
    genero: '',
    nacionalidade: '',
    provincia: '',
    municipio: '',
    morada: '',
    email: '',
    telefone: '',
    img: null,
  });

  useEffect(() => {
    // Carregar dados atuais do perfil
    loadCurrentProfile();
  }, []);

  const loadCurrentProfile = async () => {
    try {
      const response = await ApiService.getProfile();
      const user = response.user;

      setFormData({
        bi: '', // Campo BI deve ficar vazio para o usuário inserir e validar
        nome: user.nome || '',
        data_nascimento: user.data_nascimento ? formatDateForInput(user.data_nascimento) : '',
        genero: user.genero || '',
        nacionalidade: user.nacionalidade || '',
        provincia: user.provincia || '',
        municipio: user.municipio || '',
        morada: user.morada || '',
        email: user.email || '',
        telefone: user.telefone || '',
        img: user.img || null,
      });

      // Resetar estado de validação
      setBiValidated(false);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleValidateBI = async () => {
    if (!formData.bi || formData.bi.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o número do BI');
      return;
    }

    setValidatingBI(true);
    try {
      const response = await ApiService.validateBI(formData.bi);

      if (response.encontrado) {
        // Preencher automaticamente os campos
        setFormData(prev => ({
          ...prev,
          nome: response.dados.nome || prev.nome,
          data_nascimento: response.dados.data_nascimento ? formatDateForInput(response.dados.data_nascimento) : prev.data_nascimento,
          genero: response.dados.genero || prev.genero,
          nacionalidade: response.dados.nacionalidade || prev.nacionalidade,
          provincia: response.dados.provincia || prev.provincia,
          municipio: response.dados.municipio || prev.municipio,
          morada: response.dados.morada || prev.morada,
          email: response.dados.email || prev.email,
          img: response.dados.img || prev.img,
        }));

        setBiValidated(true);
        Alert.alert('Sucesso', 'BI validado! Dados preenchidos automaticamente.');
      } else {
        Alert.alert('BI não encontrado', 'O número de BI não foi encontrado na base de dados da seguradora.');
        setBiValidated(false);
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao validar BI');
      setBiValidated(false);
    } finally {
      setValidatingBI(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true, // Retornar em base64 para enviar ao servidor
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;

        setFormData(prev => ({
          ...prev,
          img: base64Image, // Salvar como base64 ou URI conforme necessário
        }));
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar imagem');
      console.error('Erro ao selecionar imagem:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.nome || formData.nome.trim() === '') {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    setLoading(true);
    try {
      await ApiService.updateProfile({
        nome: formData.nome,
        bi: formData.bi,
        data_nascimento: formData.data_nascimento || null,
        genero: formData.genero,
        nacionalidade: formData.nacionalidade,
        provincia: formData.provincia,
        municipio: formData.municipio,
        morada: formData.morada,
        email: formData.email,
        img: formData.img,
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar perfil');
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
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Seção de Foto */}
          <View style={styles.photoSection}>
            <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
              {formData.img ? (
                <Image source={{ uri: formData.img }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person-outline" size={60} color="#999" />
                </View>
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.photoLabel}>Toque para alterar foto</Text>
          </View>

          {/* Campo de Validação de BI */}
          <View style={styles.biValidationSection}>
            <Text style={styles.sectionTitle}>Validação de BI</Text>
            <View style={styles.biContainer}>
              <TextInput
                style={styles.biInput}
                placeholder="Digite o número do BI"
                placeholderTextColor="#999"
                value={formData.bi}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, bi: text }));
                  setBiValidated(false);
                }}
              />
              <TouchableOpacity
                style={[styles.validateButton, validatingBI && styles.validateButtonDisabled]}
                onPress={handleValidateBI}
                disabled={validatingBI}
              >
                {validatingBI ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                    <Text style={styles.validateButtonText}>Validar</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            {biValidated && (
              <View style={styles.successBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#A6C838" />
                <Text style={styles.successText}>BI validado com sucesso</Text>
              </View>
            )}
          </View>

          {/* Campos do Formulário */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={formData.nome}
                onChangeText={(text) => setFormData(prev => ({ ...prev, nome: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={formData.data_nascimento}
                onChangeText={(text) => setFormData(prev => ({ ...prev, data_nascimento: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Género</Text>
              <TextInput
                style={styles.input}
                placeholder="Masculino, Feminino, etc."
                value={formData.genero}
                onChangeText={(text) => setFormData(prev => ({ ...prev, genero: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nacionalidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Nacionalidade"
                value={formData.nacionalidade}
                onChangeText={(text) => setFormData(prev => ({ ...prev, nacionalidade: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Província</Text>
              <TextInput
                style={styles.input}
                placeholder="Província"
                value={formData.provincia}
                onChangeText={(text) => setFormData(prev => ({ ...prev, provincia: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Município</Text>
              <TextInput
                style={styles.input}
                placeholder="Município"
                value={formData.municipio}
                onChangeText={(text) => setFormData(prev => ({ ...prev, municipio: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Morada</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Endereço completo"
                multiline
                numberOfLines={3}
                value={formData.morada}
                onChangeText={(text) => setFormData(prev => ({ ...prev, morada: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="923 000 000"
                keyboardType="phone-pad"
                value={formData.telefone}
                editable={false}
              />
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002D5E',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#002D5E',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#002D5E',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#A6C838',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  photoLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  biValidationSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002D5E',
    marginBottom: 15,
  },
  biContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  biInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#002D5E',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  validateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A6C838',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  validateButtonDisabled: {
    opacity: 0.6,
  },
  validateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8E8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    gap: 8,
  },
  successText: {
    color: '#A6C838',
    fontWeight: '600',
    fontSize: 14,
  },
  formSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#002D5E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002D5E',
    paddingVertical: 16,
    borderRadius: 15,
    gap: 10,
    marginTop: 10,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

