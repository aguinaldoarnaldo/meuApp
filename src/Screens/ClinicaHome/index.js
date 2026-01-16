import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { theme } from '../../styles/theme';


export default function ClinicaHome({ navigation }) {
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
           <Ionicons name="heart-circle" size={40} color={theme.colors.primary} />
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
          <TouchableOpacity style={styles.scanButton} 
            onPress={() => navigation.navigate("QRScannerScreen")}>
            <Ionicons name="qr-code-outline" size={24} color={theme.colors.white} />
            <Text style={styles.scanButtonText}>Escanear QR do Cliente</Text>
            <Ionicons name="image-outline" size={22} color={theme.colors.white} />
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
                  color={item.status === 'Confirmado' ? theme.colors.secondary : theme.colors.primary} 
                />
                <Text style={[
                  styles.statusText, 
                  { color: item.status === 'Confirmado' ? theme.colors.secondary : theme.colors.primary }
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
