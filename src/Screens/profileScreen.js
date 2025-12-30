import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: '#002D5E',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editHeaderButton: {
    padding: 5,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 70, // Espaço para o avatar que fica "flutuando"
  },
  profileCard: {
    backgroundColor: '#002D5E',
    borderRadius: 35,
    paddingHorizontal: 50,
    paddingBottom: 40,
    alignItems: 'center',
    // Sombra para Android e iOS
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  avatarContainer: {
    marginTop: -70, // Faz o avatar subir para fora do card azul
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  cameraBadge: {
    position: 'absolute',
    right: -5,
    top: 5,
    backgroundColor: '#002D5E',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    width: 100,
    height: 3,
    backgroundColor: '#A6C838', // Verde limão da marca
    marginVertical: 15,
    borderRadius: 2,
  },
  infoList: {
    width: '109%',
    marginBottom: 25,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'normal',
    opacity: 0.9,
  },
  passwordButton: {
    backgroundColor: '#A6C838', // Verde limão conforme imagem
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '100%',
  },
  passwordButtonText: {
    color: '#002D5E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
  },
});