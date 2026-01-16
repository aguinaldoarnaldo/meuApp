import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';
import { theme } from '../../styles/theme';

export default function PartnersScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('clinica'); // 'clinica' ou 'farmacia'
  const [clinicas, setClinicas] = useState([]);
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getClinicas();
      // Separar por tipo, se o backend retornar misturado
      // Assumindo que o backend retorna um array único com campo 'tipo'
      const all = data.clinicas || [];
      setClinicas(all.filter(i => i.tipo === 'clinica'));
      setFarmacias(all.filter(i => i.tipo === 'farmacia'));
    } catch (error) {
      console.error('Erro ao carregar parceiros:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    const data = activeTab === 'clinica' ? clinicas : farmacias;
    if (!search) return data;
    
    return data.filter(item => 
      item.nome.toLowerCase().includes(search.toLowerCase()) || 
      item.endereco?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const currentData = getFilteredData();

  return (
    <SafeAreaView style={styles.container}>
      {/* BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
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
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* LISTA DE RESULTADOS */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <TouchableOpacity key={item.id} style={styles.listItem}>
                <View style={styles.avatarCircle}>
                  <Ionicons name="location-outline" size={24} color="#999" />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.partnerName}>{item.nome}</Text>
                  <Text style={styles.partnerLocation}>{item.endereco || 'Endereço não disponível'}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum local encontrado.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
