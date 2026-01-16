import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // Resumo no topo
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  // Seções da lista
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 15,
    marginBottom: 10,
  },

  // Card de Fatura
  invoiceCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Sombra
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5, // Borda colorida indicando status
  },
  invoiceInfo: {
    flex: 1,
  },
  refText: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  descText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 13,
    color: '#666',
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
