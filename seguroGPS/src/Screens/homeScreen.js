import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function homeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width, height } = useWindowDimensions();

  // Configuração para o Menu ocupar 95% da largura
  const menuWidth = width * 0.95;

  return (
    <SafeAreaView style={styles.container}>

      {/* --- PARTE ESTÁTICA (FIXA NO TOPO) --- */}
      <View style={styles.fixedTopSection}>
        {/* Header Azul */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            <Ionicons name="menu-outline" size={32} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.userName}>Délcio Silva</Text>

          <View style={styles.headerIcons}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={20} color="#666" />
            </View>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons name="notifications-outline" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cartão Verde (Sobreposto ao azul e estático) */}
        <View style={styles.cardContainer}>
          <View style={styles.healthCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Cartão de Saúde</Text>
              < TouchableOpacity >
              <Ionicons name="qr-code-outline" size={35} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>Délcio Manuel da Silva</Text>
              <Text style={styles.cardSubText}>Data Nascimento: 12/01/03</Text>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardFooterLabel}>Válido Até</Text>
                <Text style={styles.cardFooterValue}>12/26</Text>
              </View>
              <View>
                <Text style={styles.cardFooterLabel}>Apólice</Text>
                <Text style={styles.cardFooterValue}>20251220</Text>
              </View>
            </View>
          </View>
        </View>
      </View>



      {/* --- PARTE COM SCROLL (APENAS CONTEÚDO INFERIOR) --- */}
      <ScrollView
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.actionRow}>
          <ActionItem icon="home-outline" label="Pontos de Saúde" />
          <ActionItem icon="grid-outline" label="Simulação" />
        </View>

        <Text style={styles.sectionTitle}>Últimas atualizações</Text>
        <View style={styles.updatesBox}>
          <UpdateItem clinic="Clinica Girassol" status="Confirmado" time="Ontem" confirmed />
          <UpdateItem clinic="Clinica Girassol" status="Pendente" time="Á 3 dias" />
          <UpdateItem clinic="Clinica Girassol" status="Confirmado" time="12/12/25" confirmed />
        </View>

        <View style={styles.expirationBanner}>
          <View style={styles.expIconBox} />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.expTitle}>Subscrição a expirar</Text>
            <Text style={styles.expText}>A sua subscrição termina em 5 dias. Renove para continuar protegido.</Text>
          </View>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* --- MENU OVERLAY (OCUPANDO 95%) --- */}
      {menuOpen && (
        <View style={[styles.menuOverlay, { width: menuWidth }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuLogo}>CONFIA+</Text>
              <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <Ionicons name="close-outline" size={40} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuItemsList}>
              <MenuItem label="Saúde" active />
              <MenuItem label="Histórico" />
              <MenuItem label="Faturas" />
              <MenuItem label="Agências" />
              <MenuItem label="Termos e Condições" />
            </View>

            <TouchableOpacity style={styles.logoutContainer}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}

const ActionItem = ({ label, icon }) => (
  <TouchableOpacity style={styles.actionItem}>
    <View style={styles.actionIconBox}>
      <Ionicons name={icon} size={22} color="#002D5E" />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const UpdateItem = ({ clinic, status, time, confirmed }) => (
  <TouchableOpacity style={styles.updateItem}>
    <View style={{ flex: 1 }}>
      <Text style={styles.updateClinic}>{clinic}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.updateStatus}>{status}</Text>
        {confirmed && <Ionicons name="checkmark-outline" size={14} color="#007AFF" style={{ marginLeft: 4 }} />}
        <Text style={styles.updateTime}> • {time}</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward-outline" size={20} color="#CCC" />
  </TouchableOpacity>
);

const MenuItem = ({ label, active }) => (
  <TouchableOpacity style={[styles.menuItem, active && styles.menuItemActive]}>
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  // Seção Superior Fixa
  fixedTopSection: {
    backgroundColor: '#FFF',
    zIndex: 10,
  },
  header: {
    backgroundColor: '#002D5E',
    height: 180, // Altura fixa para o fundo azul
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userName: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  avatarCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center' },

  cardContainer: {
    marginTop: -80, // Faz o cartão subir e ficar "em cima" do azul
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  healthCard: {
    backgroundColor: '#A6C838',
    borderRadius: 25,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cardInfo: { marginTop: 15 },
  cardName: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  cardSubText: { color: '#FFF', fontSize: 13, opacity: 0.9 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cardFooterLabel: { color: '#FFF', fontSize: 11, opacity: 0.8 },
  cardFooterValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },

  // Seção de Scroll
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  actionItem: { alignItems: 'center', marginHorizontal: 15 },
  actionIconBox: { width: 50, height: 50, backgroundColor: '#F0F4F8', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 11, color: '#002D5E', fontWeight: 'bold', marginTop: 6, textAlign: 'center', width: 65 },

  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 12 },
  updatesBox: { backgroundColor: '#F0F0F0', borderRadius: 20, overflow: 'hidden' },
  updateItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  updateClinic: { fontWeight: 'bold', fontSize: 15 },
  updateStatus: { color: '#666', fontSize: 12 },
  updateTime: { color: '#999', fontSize: 12 },

  expirationBanner: { backgroundColor: '#002D5E', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  expIconBox: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
  expTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  expText: { color: '#FFF', fontSize: 12, opacity: 0.8, marginTop: 2 },

  // Menu Lateral (95% largura)
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#A6C838',
    zIndex: 100,
    paddingHorizontal: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  menuLogo: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  menuItemsList: { marginTop: 50, alignItems: 'center' },
  menuItem: { paddingVertical: 15, width: '100%', alignItems: 'center' },
  menuItemActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25 },
  menuItemText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  logoutContainer: { position: 'absolute', bottom: 40, alignSelf: 'center' },
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});