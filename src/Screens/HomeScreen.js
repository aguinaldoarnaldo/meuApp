import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Platform, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';
import QRCodeModal from '../components/QRCodeModal';

export default function HomeScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [healthCard, setHealthCard] = useState(null);
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [healthCardData, procedimentosData] = await Promise.all([
        ApiService.getHealthCard(),
        ApiService.getProcedimentos(),
      ]);
      setHealthCard(healthCardData);
      setProcedimentos(procedimentosData.procedimentos || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await ApiService.logout();
    navigation?.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

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


          <View style={styles.headerIcons}>
            <View style={styles.avatarCircle}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Ionicons name="person-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.navigate("NotificationsScreen")}>
              <Ionicons name="notifications-outline" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cartão Verde (Sobreposto ao azul e estático) */}
        <View style={styles.cardContainer}>
          <View style={styles.healthCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Cartão de Saúde</Text>
              <TouchableOpacity onPress={() => setQrCodeModalVisible(true)}>
                <Ionicons name="qr-code-outline" size={35} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardInfo}>
              {healthCard?.nome && (
                <Text style={styles.cardName}>{healthCard.nome}</Text>
              )}
              <Text style={styles.cardSubText}>
                Data Nascimento: {healthCard?.data_nascimento || '--/--/--'}
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardFooterLabel}>Válido Até</Text>
                <Text style={styles.cardFooterValue}>{healthCard?.validade || '--/--'}</Text>
              </View>
              <View>
                <Text style={styles.cardFooterLabel}>Apólice</Text>
                <Text style={styles.cardFooterValue}>{healthCard?.apolice || '--------'}</Text>
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
            <ActionItem icon="home-outline" label="Pontos de Saúde" onPress={() => navigation.navigate('partnerScreen')} />
          <ActionItem icon="grid-outline" label="Simulação" />
        </View>

        <Text style={styles.sectionTitle}>Últimas atualizações</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#002D5E" />
          </View>
        ) : procedimentos.length > 0 ? (
          <View style={styles.updatesBox}>
            {procedimentos.slice(0, 3).map((proc) => (
              <UpdateItem
                key={proc.id}
                clinic={proc.clinica}
                status={proc.status}
                time={proc.tempo_relativo}
                confirmed={proc.status === 'Confirmado'}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum procedimento encontrado</Text>
          </View>
        )}

        {/*<View style={styles.expirationBanner}>
          <View style={styles.expIconBox} />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.expTitle}>Subscrição a expirar</Text>
            <Text style={styles.expText}>A sua subscrição termina em 5 dias. Renove para continuar protegido.</Text>
          </View>
        </View>*/}
        <View style={{ height: 30 }} />
        </ScrollView>

{/* MENU LATERAL */}
{menuOpen && (
  <View style={[styles.menuOverlay, { width: menuWidth }]}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuLogo}>SeguroGPS</Text>
        <TouchableOpacity onPress={() => setMenuOpen(false)}>
          <Ionicons name="close-outline" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItemsList}>
        <MenuItem
          label="Saúde"
          onPress={() => {
            setMenuOpen(false)
            navigation.navigate('Health')
          }}
        />

        <MenuItem
          label="Histórico"
          onPress={() => {
            setMenuOpen(false)
            navigation.navigate('History')
          }}
        />

        <MenuItem
          label="Faturas"
          onPress={() => {
            setMenuOpen(false)
            navigation.navigate('Invoices')
          }}
        />

        <MenuItem
          label="Agências"
          onPress={() => {
            setMenuOpen(false)
            navigation.navigate('Agencies')
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </View>
)}

      {/* Modal QR Code */}
      <QRCodeModal
        visible={qrCodeModalVisible}
        onClose={() => setQrCodeModalVisible(false)}
        tipoUso="consulta"
      />
    </SafeAreaView>
  );
}

const MenuItem = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, active && styles.menuItemActive]}
    onPress={onPress}
  >
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
)


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
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  loadingContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 20,
    height: "100%",
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});