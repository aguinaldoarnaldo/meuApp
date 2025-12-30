import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PartnersScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('clinica'); // 'clinica' ou 'farmacia'

  // Dados fictícios para as duas categorias
  const clinicas = [
    { id: '1', name: 'Clínica Girassol', location: 'Luanda, Morro Bento' },
    { id: '2', name: 'Clínica Sagrada Esperança', location: 'Luanda, Ilha' },
    { id: '3', name: 'Centro Médico da Paz', location: 'Benguela, Centro' },
    { id: '4', name: 'Clínica Multiperfil', location: 'Luanda, Alvalade' },
    { id: '5', name: 'Clínica de Luanda', location: 'Luanda, Maianga' },
  ];

  const farmacias = [
    { id: '1', name: 'Farmácia Angola', location: 'Luanda, Talatona' },
    { id: '2', name: 'Farmácia Popular', location: 'Huambo, Centro' },
    { id: '3', name: 'Farmácia Prestigio', location: 'Luanda, Kilamba' },
    { id: '4', name: 'Mecofarma', location: 'Viana, Estrada Direta' },
  ];

  const currentData = activeTab === 'clinica' ? clinicas : farmacias;

  return (
    <SafeAreaView style={styles.container}>
      {/* BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#002D5E" />
        </TouchableOpacity>
      </View>

      {/* SELETOR DE SEÇÕES (CLÍNICA / FARMÁCIA) */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBackground}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'clinica' && styles.activeTab]}
            onPress={() => setActiveTab('clinica')}
          >
            <Text style={[styles.tabText, activeTab === 'clinica' && styles.activeTabText]}>
              Clínica
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'farmacia' && styles.activeTab]}
            onPress={() => setActiveTab('farmacia')}
          >
            <Text style={[styles.tabText, activeTab === 'farmacia' && styles.activeTabText]}>
              Farmácia
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BARRA DE PESQUISA */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" style={{ marginLeft: 15 }} />
          <TextInput 
            placeholder={`Pesquisar por ${activeTab}...`}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* LISTA DE RESULTADOS */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {currentData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={24} color="#999" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.partnerName}>{item.name}</Text>
              <Text style={styles.partnerLocation}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    width: '85%',
    height: 60,
    borderRadius: 30,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#A6C838', // Verde limão da sua marca
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A6C838', // Texto verde quando inativo
  },
  activeTabText: {
    color: '#FFF', // Texto branco quando ativo
  },
  searchContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 15,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  partnerLocation: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});