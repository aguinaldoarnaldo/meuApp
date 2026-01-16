import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';
import { theme } from '../../styles/theme';

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
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
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
            <Ionicons name="shield-checkmark" size={40} color={theme.colors.white} />
          </View>
          <Text style={styles.introTitle}>O Seu Seguro de Saúde</Text>
          <Text style={styles.introText}>
            O seu seguro de saúde protege contra despesas médicas inesperadas, ajuda na prevenção e garante controlo de custos.
          </Text>
        </View>

        {/* Cartão do Seguro Ativo */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : healthCard && (
          <View style={styles.activeInsuranceCard}>
            <View style={styles.insuranceHeader}>
              <View>
                <Text style={styles.insuranceLabel}>Seguro Ativo</Text>
                <Text style={styles.insuranceValue}>{healthCard.apolice || 'Não informado'}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.secondary} />
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
            <Ionicons name="school-outline" size={28} color={theme.colors.primary} />
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
    <Ionicons name={icon} size={18} color={theme.colors.secondary} />
    <Text style={styles.coverageItemText}>{text}</Text>
  </View>
);

// Componente para cartão de cobertura
const CoverageCard = ({ icon, title, covered, notCovered }) => (
  <View style={styles.coverageCard}>
    <View style={styles.coverageCardHeader}>
      <Ionicons name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.coverageCardTitle}>{title}</Text>
    </View>

    <View style={styles.coverageLists}>
      <View style={styles.coveredSection}>
        <Text style={styles.coveredTitle}>✓ Coberto</Text>
        {covered.map((item, index) => (
          <View key={index} style={styles.coveredItem}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.secondary} />
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
    <Ionicons name={icon} size={24} color={theme.colors.primary} />
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
      color={type === 'warning' ? '#FF6B6B' : theme.colors.primary} 
    />
    <View style={styles.alertContent}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertText}>{text}</Text>
    </View>
  </View>
);
