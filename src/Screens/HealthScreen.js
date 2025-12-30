import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';

export default function HealthScreen({ navigation }) {
  const [healthCard, setHealthCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const response = await ApiService.getHealthCard();
      setHealthCard(response);
    } catch (error) {
      console.error('Erro ao carregar dados do cartão:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#002D5E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saúde</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco Explicativo Inicial */}
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="shield-checkmark" size={40} color="#002D5E" />
          </View>
          <Text style={styles.introTitle}>O Seu Seguro de Saúde</Text>
          <Text style={styles.introText}>
            O seu seguro de saúde protege contra despesas médicas inesperadas, ajuda na prevenção e garante controlo de custos.
          </Text>
        </View>

        {/* Cartão do Seguro Ativo */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#002D5E" />
          </View>
        ) : healthCard && (
          <View style={styles.activeInsuranceCard}>
            <View style={styles.insuranceHeader}>
              <View>
                <Text style={styles.insuranceLabel}>Seguro Ativo</Text>
                <Text style={styles.insuranceValue}>{healthCard.apolice || 'Não informado'}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#A6C838" />
                <Text style={styles.statusText}>Ativo</Text>
              </View>
            </View>
            
            <View style={styles.insuranceDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={18} color="#666" />
                <Text style={styles.detailText}>
                  Válido até: {healthCard.validade || '--/--'}
                </Text>
              </View>
            </View>

            <View style={styles.coverageSection}>
              <Text style={styles.coverageTitle}>Benefícios Principais</Text>
              <CoverageItem icon="medical-outline" text="Consultas médicas" />
              <CoverageItem icon="fitness-outline" text="Exames e análises" />
              <CoverageItem icon="pills-outline" text="Medicamentos" />
              <CoverageItem icon="flame-outline" text="Urgências 24/7" />
            </View>
          </View>
        )}

        {/* Cartões Informativos */}
        <Text style={styles.sectionTitle}>O Que Está Coberto</Text>

        <CoverageCard
          icon="medical-outline"
          title="Consultas Médicas"
          covered={['Consulta geral', 'Especialidades', 'Acompanhamento']}
          notCovered={['Estética', 'Cirurgias cosméticas']}
        />

        <CoverageCard
          icon="flask-outline"
          title="Exames e Análises"
          covered={['Exames laboratoriais', 'Raio-X', 'Ecografias básicas']}
          notCovered={['Exames experimentais', 'Cosméticos']}
        />

        <CoverageCard
          icon="pills-outline"
          title="Medicamentos"
          covered={['Medicamentos prescritos', 'Farmácia credenciada']}
          notCovered={['Vitaminas não prescritas', 'Produtos estéticos']}
        />

        <CoverageCard
          icon="flame-outline"
          title="Urgências"
          covered={['Atendimento 24h', 'Ambulância', 'Pronto-socorro']}
          notCovered={['Urgências não médicas']}
        />

        {/* Seção Educativa */}
        <View style={styles.educationSection}>
          <View style={styles.educationHeader}>
            <Ionicons name="school-outline" size={28} color="#002D5E" />
            <Text style={styles.educationTitle}>Como Usar o Seu Seguro de Forma Inteligente</Text>
          </View>

          <TipCard
            icon="shield-checkmark-outline"
            title="Prevenção é a Chave"
            text="Faça consultas de rotina regularmente para evitar problemas maiores no futuro."
          />

          <TipCard
            icon="receipt-outline"
            title="Guarde os Comprovantes"
            text="Mantenha todos os recibos e documentos médicos organizados para facilitar reembolsos."
          />

          <TipCard
            icon="location-outline"
            title="Use Parceiros Credenciados"
            text="Priorize clínicas e farmácias parceiras para aproveitar melhor seus benefícios."
          />

          <TipCard
            icon="calendar-outline"
            title="Planifique Consultas"
            text="Agende consultas com antecedência e evite urgências desnecessárias."
          />
        </View>

        {/* Alertas Informativos */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Avisos Importantes</Text>

          <AlertCard
            type="info"
            icon="information-circle-outline"
            title="Uso Responsável"
            text="O uso excessivo pode impactar suas coberturas futuras. Use o seguro de forma consciente."
          />

          <AlertCard
            type="warning"
            icon="warning-outline"
            title="Recomendações Preventivas"
            text="Mantenha um estilo de vida saudável. Prevenção é sempre melhor que tratamento."
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente para item de cobertura
const CoverageItem = ({ icon, text }) => (
  <View style={styles.coverageItem}>
    <Ionicons name={icon} size={18} color="#A6C838" />
    <Text style={styles.coverageItemText}>{text}</Text>
  </View>
);

// Componente para cartão de cobertura
const CoverageCard = ({ icon, title, covered, notCovered }) => (
  <View style={styles.coverageCard}>
    <View style={styles.coverageCardHeader}>
      <Ionicons name={icon} size={24} color="#002D5E" />
      <Text style={styles.coverageCardTitle}>{title}</Text>
    </View>

    <View style={styles.coverageLists}>
      <View style={styles.coveredSection}>
        <Text style={styles.coveredTitle}>✓ Coberto</Text>
        {covered.map((item, index) => (
          <View key={index} style={styles.coveredItem}>
            <Ionicons name="checkmark-circle" size={16} color="#A6C838" />
            <Text style={styles.coveredText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.notCoveredSection}>
        <Text style={styles.notCoveredTitle}>✗ Não Coberto</Text>
        {notCovered.map((item, index) => (
          <View key={index} style={styles.notCoveredItem}>
            <Ionicons name="close-circle" size={16} color="#FF6B6B" />
            <Text style={styles.notCoveredText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

// Componente para dica educativa
const TipCard = ({ icon, title, text }) => (
  <View style={styles.tipCard}>
    <Ionicons name={icon} size={24} color="#002D5E" />
    <View style={styles.tipContent}>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  </View>
);

// Componente para alerta
const AlertCard = ({ type, icon, title, text }) => (
  <View style={[styles.alertCard, type === 'warning' && styles.alertCardWarning]}>
    <Ionicons 
      name={icon} 
      size={24} 
      color={type === 'warning' ? '#FF6B6B' : '#002D5E'} 
    />
    <View style={styles.alertContent}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertText}>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002D5E',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  introCard: {
    backgroundColor: '#002D5E',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  introIcon: {
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  activeInsuranceCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  insuranceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  insuranceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D5E',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    color: '#A6C838',
    fontWeight: '600',
    fontSize: 14,
  },
  insuranceDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  coverageSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  coverageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002D5E',
    marginBottom: 12,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  coverageItemText: {
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D5E',
    marginBottom: 15,
    marginTop: 10,
  },
  coverageCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  coverageCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  coverageCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002D5E',
  },
  coverageLists: {
    gap: 15,
  },
  coveredSection: {
    marginBottom: 10,
  },
  coveredTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A6C838',
    marginBottom: 8,
  },
  coveredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  coveredText: {
    fontSize: 14,
    color: '#333',
  },
  notCoveredSection: {
    marginTop: 10,
  },
  notCoveredTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  notCoveredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  notCoveredText: {
    fontSize: 14,
    color: '#666',
  },
  educationSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  educationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  educationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D5E',
    flex: 1,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002D5E',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  alertsSection: {
    marginTop: 10,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    gap: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#002D5E',
  },
  alertCardWarning: {
    backgroundColor: '#FFF5F5',
    borderLeftColor: '#FF6B6B',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002D5E',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

