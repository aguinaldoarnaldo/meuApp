import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';

export default function ProfileScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  // Recarregar quando a tela voltar ao foco (após editar)
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      loadProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getProfile();
      setProfile(response.user);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar perfil');
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '--/--/----';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
  };

  // Ajuste responsivo: o card ocupa 90% da largura em telas maiores
  const cardWidth = width > 500 ? 450 : width * 0.9;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SUPERIOR */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack("home")}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editHeaderButton}
          onPress={() => navigation?.navigate('EditProfile')}
        >
          <Ionicons name="create-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#002D5E" />
          </View>
        ) : profile ? (
          <View style={[styles.profileCard, { width: cardWidth }]}>

            {/* AVATAR COM ÍCONE DE CÂMERA */}
            <View style={styles.avatarContainer}>
              {profile.img ? (
                <Image
                  source={{ uri: profile.img }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person-outline" size={80} color="#999" />
                </View>
              )}
              <TouchableOpacity
                style={styles.cameraBadge}
                onPress={() => navigation?.navigate('EditProfile')}
              >
                <Ionicons name="image-outline" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* NOME E LINHA DIVISORA */}
            <Text style={styles.userName}>{profile.nome || 'Nome não informado'}</Text>
            <View style={styles.divider} />

            {/* LISTA DE INFORMAÇÕES */}
            <View style={styles.infoList}>
              <InfoRow label="BI" value={profile.bi || 'Não informado'} />
              <InfoRow label="Data de Nascimento" value={formatDate(profile.data_nascimento)} />
              <InfoRow label="Género" value={profile.genero || 'Não informado'} />
              <InfoRow label="Nacionalidade" value={profile.nacionalidade || 'Não informado'} />
              <InfoRow label="Província" value={profile.provincia || 'Não informado'} />
              <InfoRow label="Município" value={profile.municipio || 'Não informado'} />
              <InfoRow label="Morada" value={profile.morada || 'Não informado'} />
              <InfoRow label="Telefone" value={profile.telefone || 'Não informado'} />
              <InfoRow label="E-mail" value={profile.email || 'Não informado'} />
            </View>

            {/* BOTÃO ALTERAR SENHA */}
            <TouchableOpacity
              style={styles.passwordButton}
              onPress={() => navigation?.navigate('ChangePassword')}
            >
              <Text style={styles.passwordButtonText}>Alterar Senha</Text>
              <Ionicons name="pencil" size={20} color="#002D5E" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar perfil</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente para as linhas de informação
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}: <Text style={styles.infoValue}>{value}</Text></Text>
  </View>
);
