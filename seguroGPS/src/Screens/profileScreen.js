import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  const { width } = useWindowDimensions();

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
        
        <TouchableOpacity style={styles.editHeaderButton}>
          <Ionicons name="create-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.profileCard, { width: cardWidth }]}>
          
          {/* AVATAR COM ÍCONE DE CÂMERA */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person-outline" size={80} color="#999" />
            </View>
            <TouchableOpacity style={styles.cameraBadge}>
              <Ionicons name="image-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* NOME E LINHA DIVISORA */}
          <Text style={styles.userName}>Délcio Manuel da Silva</Text>
          <View style={styles.divider} />

          {/* LISTA DE INFORMAÇÕES */}
          <View style={styles.infoList}>
            <InfoRow label="BI" value="00409837BE078" />
            <InfoRow label="Data de Nascimento" value="12/01/2003" />
            <InfoRow label="Género" value="Masculino" />
            <InfoRow label="Nacionalidade" value="Angolana" />
            <InfoRow label="Província" value="Bié" />
            <InfoRow label="Município" value="XXXXXXXXXXXXX" />
            <InfoRow label="Morada" value="XXXXXXXX" />
            <InfoRow label="Telefone" value="922 000 000" />
            <InfoRow label="E-mail" value="delciomanuelsilva12@gmail.com" />
          </View>

          {/* BOTÃO ALTERAR SENHA */}
          <TouchableOpacity style={styles.passwordButton}>
            <Text style={styles.passwordButtonText}>Alterar Senha</Text>
            <Ionicons name="pencil" size={20} color="#002D5E" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
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
});