import React, { useState, useEffect } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import QRCodeModal from '../../components/QRCodeModal';
import { styles } from './styles';

export default function HomeScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [healthCard, setHealthCard] = useState(null);
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const { width } = useWindowDimensions();

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
                <Ionicons name="qr-code-outline" size={35} color="#002D5E" />
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
        <View style={{ height: 30 }} />
        </ScrollView>

{/* MENU LATERAL */}
{menuOpen && (
  <View style={[styles.menuOverlay, { width: menuWidth }]}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuLogo}>SeguroGPS</Text>
        <TouchableOpacity onPress={() => setMenuOpen(false)}>
          <Ionicons name="close-outline" size={40} color="#002D5E" />
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


const ActionItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
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
