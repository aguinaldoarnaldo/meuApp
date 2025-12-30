import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ClinicaHome() {
  const { width } = useWindowDimensions();

  // Dados Mockados baseados na imagem
  const atendimentosHoje = [
    { id: '1', nome: 'Albertina Chicapa', hora: '09:10', status: 'Confirmado' },
    { id: '2', nome: 'Délcio Silva', hora: '15:30', status: 'Confirmado' },
    { id: '3', nome: 'Albertina Chicapa', hora: '09:10', status: 'Confirmado' },
    { id: '4', nome: 'Albertina Chicapa', hora: '09:10', status: 'Em atendimento' },
  ];

  const pendentes = [
    { id: '5', nome: 'Albertina Chicapa', hora: '09:10' },
    { id: '6', nome: 'Albertina Chicapa', hora: '09:10' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER PRINCIPAL */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={30} color="#333" />
        </TouchableOpacity>
        
        {/* Logo Central (Placeholder do Ícone de Localização/Coração) */}
        <View style={styles.logoContainer}>
           <Ionicons name="heart-circle" size={40} color="#007AFF" />
        </View>

        <View style={styles.headerIcons}>
          <View style={styles.avatarMini}>
            <Ionicons name="person-outline" size={18} color="#666" />
          </View>
          <Ionicons name="notifications-outline" size={26} color="#333" style={{ marginLeft: 15 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CARD DO MÉDICO/CLÍNICA */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorInfo}>
            <Ionicons name="person-outline" size={20} color="#000" />
            <Text style={styles.doctorName}>Dr. Albertina Chicapa</Text>
          </View>

          {/* BOTÃO ESCANEAR QR CODE */}
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="qr-code-outline" size={24} color="#FFF" />
            <Text style={styles.scanButtonText}>Escanear QR do Cliente</Text>
            <Ionicons name="image-outline" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* SEÇÃO ATENDIMENTOS DE HOJE */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar-outline" size={22} color="#000" />
              <Text style={styles.sectionTitle}>Atendimentos de Hoje</Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </View>

          {atendimentosHoje.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>{item.nome}</Text>
                <View style={styles.itemSubRow}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.itemTime}>{item.hora}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <Ionicons 
                  name={item.status === 'Confirmado' ? "checkmark-circle-outline" : "time-outline"} 
                  size={16} 
                  color={item.status === 'Confirmado' ? "#A6C838" : "#002D5E"} 
                />
                <Text style={[
                  styles.statusText, 
                  { color: item.status === 'Confirmado' ? "#A6C838" : "#002D5E" }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* SEÇÃO PENDENTES DE CONFIRMAÇÃO */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={22} color="#E67E22" />
              <Text style={styles.sectionTitle}>Pendentes de confirmação</Text>
            </View>
            <View style={[styles.badgeCount, { backgroundColor: '#E67E22' }]}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>

          {pendentes.map((item) => (
            <View key={item.id} style={styles.pendingCard}>
              <Text style={styles.itemName}>{item.nome}</Text>
              <View style={styles.itemSubRow}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.itemTime}>{item.hora}</Text>
              </View>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF'
  },
  logoContainer: { flex: 1, alignItems: 'center' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
  
  scrollContent: { padding: 20 },

  doctorCard: {
    backgroundColor: '#A6C838', // Verde limão
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  },
  doctorInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  doctorName: { marginLeft: 10, fontSize: 16, fontWeight: 'bold' },
  scanButton: {
    backgroundColor: '#002D5E', // Azul escuro
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  scanButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' },

  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    // Sombra leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { marginLeft: 10, fontSize: 15, fontWeight: 'bold' },
  badgeCount: { backgroundColor: '#002D5E', borderRadius: 12, width: 30, height: 24, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  itemName: { fontSize: 15, fontWeight: '600', color: '#333' },
  itemSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemTime: { fontSize: 13, color: '#666', marginLeft: 5 },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusText: { fontSize: 12, marginLeft: 5, fontWeight: '600' },

  pendingCard: {
    backgroundColor: '#FDEBD0', // Tom leve de laranja para pendentes
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F5CBA7'
  },
  confirmButton: {
    backgroundColor: '#A6C838',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  confirmButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});