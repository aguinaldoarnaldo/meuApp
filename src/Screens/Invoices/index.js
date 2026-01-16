import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../../services/api';
import { styles } from './styles';
import { theme } from '../../styles/theme';

export default function InvoicesScreen({ navigation }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getInvoices();
      setInvoices(data.invoices || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as faturas.');
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (invoice) => {
    Alert.alert(
      'Pagamento',
      `Referência Multicaixa gerada para ${invoice.referencia}.\n\nValor: ${formatCurrency(invoice.valor)}`,
      [{ text: 'Copiar Referência', onPress: () => console.log('Copiado') }, { text: 'Fechar' }]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pago': return theme.colors.success;
      case 'atrasado': return theme.colors.error;
      default: return '#FFA500'; // Laranja para pendente
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pago': return 'Pago';
      case 'atrasado': return 'Atrasado';
      default: return 'Pendente';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const pendingInvoices = invoices.filter(i => i.status !== 'pago');
  const paidInvoices = invoices.filter(i => i.status === 'pago');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Faturas</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Resumo */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Em Aberto</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.error }]}>
                {pendingInvoices.length}
              </Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total a Pagar</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(pendingInvoices.reduce((acc, curr) => acc + parseFloat(curr.valor), 0))}
              </Text>
            </View>
          </View>

          {/* Faturas Abertas */}
          {pendingInvoices.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>A Pagar</Text>
              {pendingInvoices.map((inv) => (
                <TouchableOpacity 
                  key={inv.id} 
                  style={[styles.invoiceCard, { borderLeftColor: getStatusColor(inv.status) }]}
                  onPress={() => handlePay(inv)}
                >
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.refText}>Ref: {inv.referencia}</Text>
                    <Text style={styles.descText}>{inv.descricao}</Text>
                    <Text style={styles.dateText}>Vence em: {formatDate(inv.data_vencimento)}</Text>
                  </View>
                  <View style={styles.amountBox}>
                    <Text style={styles.amountText}>{formatCurrency(inv.valor)}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(inv.status) }]}>
                      <Text style={styles.statusText}>{getStatusLabel(inv.status)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Histórico */}
          {paidInvoices.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Histórico</Text>
              {paidInvoices.map((inv) => (
                <View key={inv.id} style={[styles.invoiceCard, { borderLeftColor: getStatusColor(inv.status), opacity: 0.8 }]}>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.refText}>Ref: {inv.referencia}</Text>
                    <Text style={styles.descText}>{inv.descricao}</Text>
                    <Text style={styles.dateText}>Pago em: {formatDate(inv.data_pagamento)}</Text>
                  </View>
                  <View style={styles.amountBox}>
                    <Text style={styles.amountText}>{formatCurrency(inv.valor)}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(inv.status) }]}>
                      <Text style={styles.statusText}>{getStatusLabel(inv.status)}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
